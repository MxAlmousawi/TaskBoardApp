import { Box, Paper, Typography, Chip } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardModel from "../../models/CardModel";

interface Props {
  card: CardModel;
  id: number;
}
const SortableCard = ({ card, id }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      columnId: card.columnId,
      type: "card",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ display: card.isPlaceholder ? "none" : "block" }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          position: "relative",
          "&:hover": {
            boxShadow: 3,
            cursor: "grab",
          },
        }}
      >
        <Chip
          label={card.tag?.name}
          size="small"
          sx={{
            bgcolor: card.tag?.color,
            color: "white",
            position: "absolute",
            top: 10,
            right: 10,
          }}
        />
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, pr: 8 }}>
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </Paper>
    </Box>
  );
};

export default SortableCard;
