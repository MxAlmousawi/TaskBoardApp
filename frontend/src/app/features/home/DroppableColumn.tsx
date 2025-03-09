import { Paper, Typography, Box, Button } from "@mui/material";
import ColumnModel from "../../models/ColumnModel";
import { useState } from "react";
import AddCardModal from "../card/AddCardModal";

interface Props {
  column: ColumnModel;
  columnId: number;
  refetchCards: () => void;
  children: React.ReactNode;
}

const DroppableColumn = ({ column, columnId, children, refetchCards }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "background.default",
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      data-column-id={columnId}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, textAlign: "center" }}
      >
        {column.name}
      </Typography>
      <Box
        sx={{ flexGrow: 1, minHeight: "400px", p: 1 }}
        data-droppable-id={`column-${columnId}`}
      >
        {children}
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => setOpen(true)}
      >
        Create a card
      </Button>
      <AddCardModal
        columnId={columnId}
        open={open}
        setOpen={setOpen}
        refetchCards={refetchCards}
      />
    </Paper>
  );
};

export default DroppableColumn;
