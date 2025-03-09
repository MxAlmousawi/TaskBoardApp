import asyncHandler from "../middlewares/asyncHandler.js";
import Card from "../models/Card.js";
import HistoryLog from "../models/HistoryLog.js";
import Tag from "../models/Tag.js";
import { isConnectedCards } from "../utils/cardUtils.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";
import Column from "../models/Column.js";
import sequelize from "../database/db.js";

export const getAllCards = asyncHandler(async (req, res) => {
  const columns = await Column.findAll();
  const columnIds = columns.map((column) => column.id);
  const cards = await Card.findAll({
    where: { columnId: columnIds },
    include: "tag",
  });

  const cardsByColumn = columns.map((column) => {
    const orderedCards = [];
    let currentCard = cards.find(
      (card) => card.columnId === column.id && card.prevCardId === null
    );

    while (currentCard) {
      orderedCards.push(currentCard);
      currentCard = cards.find(
        (card) =>
          card.columnId === column.id && card.prevCardId === currentCard.id
      );
    }

    return { column, cards: orderedCards };
  });

  res.json(cardsByColumn);
});

export const getCardById = asyncHandler(async (req, res) => {
  const card = await Card.findByPk(req.params.id);
  if (!card) {
    throw new NotFoundError("Card not found");
  }
  res.json(card);
});

export const addCard = asyncHandler(async (req, res) => {
  const lastCard = await Card.findOne({ where: { nextCardId: null, columnId: req.body.columnId } });
  const tag = await Tag.findByPk(req.body.tagId);
  const column = await Column.findByPk(req.body.columnId);
  if (!tag) {
    throw new NotFoundError("Tag not found");
  }
  if (!column) {
    throw new NotFoundError("Column not found");
  }

  const card = await Card.create({
    ...req.body,
    prevCardId: lastCard.id,
    nextCardId: null,
  });
  if (lastCard) {
    await lastCard.update({ nextCardId: card.id });
  }
  res.status(200).json(card);
});

export const updateCard = asyncHandler(async (req, res) => {
  const card = await Card.findByPk(req.params.id);
  if (!card) {
    throw new NotFoundError("Card not found");
  }
  await card.update({
    ...req.body,
    prevCardId: card.prevCardId,
    nextCardId: card.nextCardId,
  });
  res.json(card);
});

export const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findByPk(req.params.id);
  if (!card) {
    throw new NotFoundError("Card not found");
  }
  const prevCard = await Card.findByPk(card.prevCardId);
  const nextCard = await Card.findByPk(card.nextCardId);

  if (prevCard) {
    await prevCard.update({ nextCardId: nextCard ? nextCard.id : null });
  }
  if (nextCard) {
    await nextCard.update({ prevCardId: prevCard ? prevCard.id : null });
  }

  await card.destroy();
  res.status(200).json({ message: "Card deleted" });
});

export const swapCard = asyncHandler(async (req, res) => {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    const { id, newPrevId, newNextId, newColumnId } = req.body;
    const card = await Card.findByPk(id);
    const newColumn = await Column.findByPk(newColumnId);
    const oldColumn = await Column.findByPk(card.columnId);
    const length = await Card.count({ where: { columnId: newColumnId } });
    if (!card) {
      throw new NotFoundError("Card not found");
    }
    if (!newColumn) {
      throw new NotFoundError("Column not found");
    }
    if (newPrevId === null && newNextId === null && length > 0) {
      throw new BadRequestError("Both newPrevId and newNextId cannot be null");
    }

    const oldPrevCard = await Card.findByPk(card.prevCardId);
    const oldNextCard = await Card.findByPk(card.nextCardId);

    if (oldPrevCard) {
      await oldPrevCard.update(
        {
          nextCardId: oldNextCard ? oldNextCard.id : null,
        },
        { transaction }
      );
    }
    if (oldNextCard) {
      await oldNextCard.update(
        {
          prevCardId: oldPrevCard ? oldPrevCard.id : null,
        },
        { transaction }
      );
    }

    const newPrevCard = await Card.findByPk(newPrevId);
    const newNextCard = await Card.findByPk(newNextId);

    if (
      !isConnectedCards(newPrevCard?.dataValues, newNextCard?.dataValues) &&
      length > 0
    ) {
      throw new BadRequestError(
        "newPrevId and newNextId are not connected to each other"
      );
    }

    if (newPrevCard) {
      if (newPrevCard.columnId !== newColumnId) {
        throw new BadRequestError("ColumnId is wrong");
      }
      await newPrevCard.update({ nextCardId: card.id }, { transaction });
    }
    if (newNextCard) {
      if (newNextCard.columnId !== newColumnId) {
        throw new BadRequestError("ColumnId is wrong");
      }
      await newNextCard.update({ prevCardId: card.id }, { transaction });
    }

    await card.update(
      {
        prevCardId: newPrevId,
        nextCardId: newNextId,
        columnId: newColumnId,
      },
      { transaction }
    );

    if (oldColumn.id === newColumn.id) {
      await HistoryLog.create(
        {
          message: `"${card.title}" was moved within the column "${newColumn.dataValues.name}"`,
        },
        { transaction }
      );
    } else {
      await HistoryLog.create(
        {
          message: `"${card.title}" was moved to "${newColumn.dataValues.name}"`,
        },
        { transaction }
      );
    }

    await transaction.commit();
    res.status(200).json({ message: "Card swapped successfully" });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});
