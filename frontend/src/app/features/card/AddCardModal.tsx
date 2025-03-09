import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  Chip,
  SxProps,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Cards, Tags } from "../../api/agent";
import AddTagModal from "../tag/AddTagModal";

interface Props {
  columnId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchCards: () => void;
}

const AddCardModal: React.FC<Props> = ({
  columnId,
  open,
  setOpen,
  refetchCards,
}) => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [openTag, setOpenTag] = useState(false);

  const tags = useQuery({
    queryKey: ["tags"],
    queryFn: Tags.list,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createCard"],
    mutationFn: () =>
      Cards.create({
        title: cardTitle,
        description: cardDescription,
        tagId: selectedTag as unknown as number,
        columnId: columnId,
      }),
    onSuccess: () => {
      refetchCards();
    },
  });

  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    await mutateAsync();
    if (cardTitle && cardDescription && selectedTag) {
      // Logic to save the card
      handleClose();
    }
  };

  const handleTagChange = (event: any) => {
    setSelectedTag(event?.target?.value as string);
  };
  if (tags.isLoading || tags.isFetching)
    return (
      <Modal open={open}>
        <Box sx={{ ...modalStyle }}>
          <CircularProgress />
        </Box>
      </Modal>
    );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" fontWeight={"bold"}>
          Add Card
        </Typography>
        <TextField
          label="Card Title"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Card Description"
          value={cardDescription}
          onChange={(e) => setCardDescription(e.target.value)}
          fullWidth
          required
          multiline
          rows={4}
        />
        <Select
          value={selectedTag}
          onChange={(e) => handleTagChange(e)}
          displayEmpty
          fullWidth
          required
        >
          <MenuItem value="" disabled>
            Select Tag
          </MenuItem>
          {tags.data?.map((tag: any) => (
            <MenuItem key={tag.id} value={tag.id}>
              <Box>
                <Chip sx={{ bgcolor: tag.color }} label={tag.name} />
              </Box>
            </MenuItem>
          ))}
        </Select>
        <Button
          fullWidth
          variant="outlined"
          disabled={isPending}
          onClick={() => setOpenTag(true)}
        >
          Add New Tag
        </Button>
        <AddTagModal
          open={openTag}
          setOpen={setOpenTag}
          refetch={tags.refetch}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={
              !cardTitle || !cardDescription || !selectedTag || isPending
            }
          >
            {isPending ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "1rem",
};

export default AddCardModal;
