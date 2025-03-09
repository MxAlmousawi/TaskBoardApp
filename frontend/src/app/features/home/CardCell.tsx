import { Card, CardContent, Typography } from "@mui/material";
import CardModel from "../../models/CardModel";
import { Badge } from "antd";

interface Props {
  card: CardModel;
}

const CardCell = ({ card }: Props) => {
  return (
    <Badge.Ribbon color={card.tag?.color} text={card.tag?.name}>
      <Card sx={{ mt: "0.5rem", height: "7rem", bgcolor: "background.main" }}>
        <CardContent>
          <Typography
            color="primary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {card.title}
          </Typography>
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.8rem",
            }}
          >
            {card.description}
          </Typography>
        </CardContent>
      </Card>
    </Badge.Ribbon>
  );
};

export default CardCell;
