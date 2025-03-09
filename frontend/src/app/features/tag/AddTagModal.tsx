import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  SxProps,
} from "@mui/material";
import { ColorPicker } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Tags } from "../../api/agent";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

const AddTagModal: React.FC<Props> = ({ open, setOpen, refetch }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AddTag"],
    mutationFn: () => Tags.create({ name: name, color: color }),
    onSuccess: () => {
      toast.success("Tag added successfully");
      refetch();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    await mutateAsync();
    if (name && color && !isPending) {
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" fontWeight={"bold"}>
          Add Tag
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <Box sx={{ zIndex: 1300 }}>
          {" "}
          <ColorPicker
            value={color}
            onChange={(e) => {
              setColor(e.toHexString());
              console.log(e.toHexString());
            }}
            getPopupContainer={(trigger) =>
              trigger.parentElement || document.body
            }
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            loading={isPending}
            disabled={!name || !color || isPending}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "15rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "1rem",
};

export default AddTagModal;
