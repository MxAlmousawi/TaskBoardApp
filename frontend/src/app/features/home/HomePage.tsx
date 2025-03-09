import { Box, Typography, Grid, Button } from "@mui/material";
import MyContainer from "../../common/MyContainer";
import MyLoading from "../../common/MyLoading";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCard from "./SortableCard";
import CardDisplay from "./CardDisplay";
import DroppableColumn from "./DroppableColumn";
import useKanbanBoard from "./useKanbanBoard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const {
    columns,
    sensors,
    isLoading,
    isFetching,
    activeCard,
    isDraggingInProgress,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    refetch
  } = useKanbanBoard();

  const navigate = useNavigate();

  if (isLoading || isFetching) return <MyLoading />;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "background.default",
        overflowY: "auto",
      }}
    >
      <MyContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ my: 3 }}>
            Home Page
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/logs")}
          >
            History Logs
          </Button>
        </Box>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={!isDraggingInProgress ? undefined : handleDragOver}
          onDragEnd={handleDragEnd}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
        >
          <Grid container spacing={3} sx={{ bgcolor: "background.default" }}>
            {columns.map((column: any) => (
              <Grid item xs={12} md={4} key={column.column.id}>
                <DroppableColumn
                refetchCards={refetch}
                  column={column.column}
                  columnId={column.column.id.toString()}
                >
                  <SortableContext
                    items={column.cards.map((card: any) => card.id.toString())}
                    strategy={verticalListSortingStrategy}
                  >
                    {column.cards.map((card: any) => (
                      <SortableCard
                        key={card.id}
                        id={card.id.toString()}
                        card={card}
                      />
                    ))}
                  </SortableContext>
                </DroppableColumn>
              </Grid>
            ))}
          </Grid>

          <DragOverlay>
            {activeCard ? <CardDisplay card={activeCard} /> : null}
          </DragOverlay>
        </DndContext>
      </MyContainer>
    </Box>
  );
};

export default HomePage;
