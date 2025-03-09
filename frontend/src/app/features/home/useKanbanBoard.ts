import { useQuery, useMutation } from "@tanstack/react-query";
import { Cards } from "../../api/agent";
import { useState, useEffect } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import CardModel from "../../models/CardModel";

const useKanbanBoard = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["home"],
    queryFn: Cards.list,
  });

  const [columns, setColumns] = useState<any>([]);
  const [_activeId, setActiveId] = useState<any>(null);
  const [activeCard, setActiveCard] = useState<any>(null);
  const [_activeColumnId, setActiveColumnId] = useState<any>(null);

  // Helper: Re-insert a hidden placeholder into any column that has no real cards.
  const ensurePlaceholders = (cols: any[]) => {
    return cols.map((col) => {
      const realCards = col.cards.filter((card: any) => !card.isPlaceholder);
      if (realCards.length === 0) {
        return {
          ...col,
          cards: [
            {
              id: `placeholder-${col.column.id}`,
              title: "Add Card",
              isPlaceholder: true,
            },
          ],
        };
      }
      return col;
    });
  };

  // When data loads, inject placeholders into empty columns.
  useEffect(() => {
    if (data) {
      const updatedColumns = ensurePlaceholders(data);
      setColumns(updatedColumns);
    }
  }, [data]);

  const animateLayoutChanges: AnimateLayoutChanges = (args) => {
    const { isSorting, wasDragging } = args;
    if (isSorting || wasDragging) {
      return defaultAnimateLayoutChanges(args);
    }
    return true;
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [isDraggingInProgress, setIsDraggingInProgress] = useState(false);

  // Helper: Find a card by its ID (ignoring placeholders)
  const findCardById = (cardId: string): any => {
    for (const col of columns) {
      const card = col.cards.find(
        (card: CardModel) =>
          card.id.toString() === cardId && !card.isPlaceholder
      );
      if (card) return card;
    }
    return null;
  };

  // Helper: Find the column index that contains a non-placeholder card with the given id.
  const findColumnIndexByCardId = (cardId: string): any => {
    for (let i = 0; i < columns.length; i++) {
      if (
        columns[i].cards.some(
          (card: any) => card.id.toString() === cardId && !card.isPlaceholder
        )
      ) {
        return i;
      }
    }
    return -1;
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
    const card = findCardById(active.id);
    setActiveCard(card);
    const sourceColumnIndex = findColumnIndexByCardId(active.id);
    setActiveColumnId(sourceColumnIndex);
    setIsDraggingInProgress(true);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    let overId = over.id.toString();
    const sourceColumnIndex = findColumnIndexByCardId(activeId);
    if (sourceColumnIndex === -1) return;

    let destinationColumnIndex = sourceColumnIndex;
    let insertIndex = 0;

    if (overId.startsWith("placeholder-")) {
      const realColumnId = overId.replace("placeholder-", "");
      destinationColumnIndex = columns.findIndex(
        (col: any) => col.column.id.toString() === realColumnId
      );
      insertIndex = 0;
    } else if (overId !== activeId) {
      destinationColumnIndex = findColumnIndexByCardId(overId);
      if (destinationColumnIndex === -1) {
        destinationColumnIndex = columns.findIndex(
          (col: any) => col.column.id.toString() === overId
        );
        if (destinationColumnIndex === -1) return;
        insertIndex = 0;
      } else {
        insertIndex = columns[destinationColumnIndex].cards.findIndex(
          (card: any) => card.id.toString() === overId
        );
        if (insertIndex === -1) insertIndex = 0;
      }
    }

    if (destinationColumnIndex !== sourceColumnIndex) {
      const newColumns = JSON.parse(JSON.stringify(columns));
      const sourceCardIndex = newColumns[sourceColumnIndex].cards.findIndex(
        (card: any) => card.id.toString() === activeId && !card.isPlaceholder
      );
      if (sourceCardIndex === -1) return;
      const [movedCard] = newColumns[sourceColumnIndex].cards.splice(
        sourceCardIndex,
        1
      );
      movedCard.columnId = newColumns[destinationColumnIndex].column.id;
      // If destination only has a placeholder, remove it.
      if (
        newColumns[destinationColumnIndex].cards.length === 1 &&
        newColumns[destinationColumnIndex].cards[0].isPlaceholder
      ) {
        newColumns[destinationColumnIndex].cards = [];
      }
      newColumns[destinationColumnIndex].cards.splice(
        insertIndex,
        0,
        movedCard
      );

      updateCardLinks(newColumns[sourceColumnIndex].cards);
      updateCardLinks(newColumns[destinationColumnIndex].cards);

      setColumns(newColumns);
      setActiveColumnId(destinationColumnIndex);
    }
  };

  const mutation = useMutation({
    mutationFn: Cards.swap,
    onSuccess: () => {},
    onError: () => {
      refetch();
    },
  });

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveCard(null);
    setActiveColumnId(null);
    setIsDraggingInProgress(false);
    if (!over) return;

    const activeId = active.id.toString();
    let overId = over.id.toString();
    const newColumns = JSON.parse(JSON.stringify(columns));
    const sourceColumnIndex = findColumnIndexByCardId(activeId);
    if (sourceColumnIndex === -1) return;

    let destinationColumnIndex = sourceColumnIndex;
    let insertIndex = 0;

    if (overId.startsWith("placeholder-")) {
      const realColumnId = overId.replace("placeholder-", "");
      destinationColumnIndex = columns.findIndex(
        (col: any) => col.column.id.toString() === realColumnId
      );
      insertIndex = 0;
      // Remove placeholder from the destination column.
      newColumns[destinationColumnIndex].cards = [];
    } else if (overId !== activeId) {
      destinationColumnIndex = findColumnIndexByCardId(overId);
      if (destinationColumnIndex === -1) return;
      insertIndex = newColumns[destinationColumnIndex].cards.findIndex(
        (card: any) => card.id.toString() === overId
      );
    } else {
      destinationColumnIndex = sourceColumnIndex;
      insertIndex = newColumns[destinationColumnIndex].cards.findIndex(
        (card: any) => card.id.toString() === overId
      );
    }
    if (insertIndex === -1) {
      destinationColumnIndex = columns.findIndex(
        (col: any) => col.column.id.toString() === overId
      );
      insertIndex = 0;
    }
    const sourceCardIndex = newColumns[sourceColumnIndex].cards.findIndex(
      (card: any) => card.id.toString() === activeId && !card.isPlaceholder
    );
    const [movedCard] = newColumns[sourceColumnIndex].cards.splice(
      sourceCardIndex,
      1
    );
    if (sourceColumnIndex !== destinationColumnIndex) {
      movedCard.columnId = newColumns[destinationColumnIndex].column.id;
    }
    newColumns[destinationColumnIndex].cards.splice(insertIndex, 0, movedCard);
    updateCardLinks(newColumns[sourceColumnIndex].cards);
    if (sourceColumnIndex !== destinationColumnIndex) {
      updateCardLinks(newColumns[destinationColumnIndex].cards);
    }
    // Re-insert placeholders for any columns that have become empty.
    const finalColumns = ensurePlaceholders(newColumns);
    setColumns(finalColumns);

    const newPrevId =
      insertIndex === 0
        ? null
        : finalColumns[destinationColumnIndex].cards[insertIndex - 1].id;
    const newNextId =
      insertIndex === finalColumns[destinationColumnIndex].cards.length - 1
        ? null
        : finalColumns[destinationColumnIndex].cards[insertIndex + 1].id;

    mutation.mutate({
      id: movedCard.id,
      newPrevId,
      newNextId,
      newColumnId: finalColumns[destinationColumnIndex].column.id,
    });
  };

  // Update card links for ordering.
  const updateCardLinks = (cards: any) => {
    cards.forEach((card: any, index: any) => {
      card.prevCardId = index === 0 ? null : cards[index - 1].id;
      card.nextCardId = index === cards.length - 1 ? null : cards[index + 1].id;
    });
  };

  return {
    columns,
    sensors,
    isLoading,
    isFetching,
    activeCard,
    isDraggingInProgress,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    animateLayoutChanges,
    refetch
  };
};

export default useKanbanBoard;
