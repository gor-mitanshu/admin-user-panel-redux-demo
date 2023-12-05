import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DialogModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  cancelColor?: "error" | "inherit" | "primary" | "secondary";
  confirmColor?: "error" | "inherit" | "primary" | "secondary";
}

const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  handleClose,
  handleConfirm,
  title,
  message,
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
  cancelColor = "secondary",
  confirmColor = "primary",
}: any) => {
  return (
    <Dialog
      open={isOpen}
      // onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color={cancelColor} variant="contained">
          {cancelButtonText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={confirmColor}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
