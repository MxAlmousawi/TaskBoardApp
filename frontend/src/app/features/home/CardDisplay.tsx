import { Paper, Typography, Chip } from "@mui/material";
import CardModel from "../../models/CardModel";

interface Props {
  card: CardModel;
}
const CardDisplay = ({ card }: Props) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        position: "relative",
        width: "100%",
        maxWidth: "300px",
        display:card.isPlaceholder ? "none" : "block"
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
  );
};

export default CardDisplay;
