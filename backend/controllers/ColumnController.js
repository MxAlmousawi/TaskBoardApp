import asyncHandler from "../middlewares/asyncHandler.js";
import Column from "../models/Column.js";
import NotFoundError from "../errors/NotFoundError.js";

// Get all columns
export const getAllColumns = asyncHandler(async (req, res) => {
  const columns = await Column.findAll();
  res.json(columns);
});

// Get column by ID
export const getColumnById = asyncHandler(async (req, res) => {
  const column = await Column.findByPk(req.params.id);
  if (!column) {
    throw new NotFoundError("Column not found");
  }
  res.json(column);
});

// Add a new column
export const addColumn = asyncHandler(async (req, res) => {
  const column = await Column.create(req.body);
  res.status(200).json(column);
});

// Update a column
export const updateColumn = asyncHandler(async (req, res) => {
  const column = await Column.findByPk(req.params.id);
  if (!column) {
    throw new NotFoundError("Column not found");
  }
  await column.update(req.body);
  res.json(column);
});

// Delete a column
export const deleteColumn = asyncHandler(async (req, res) => {
  const column = await Column.findByPk(req.params.id);
  if (!column) {
    throw new NotFoundError("Column not found");
  }
  await column.destroy();
  res.status(200).json({ message: "Column deleted" });
});
