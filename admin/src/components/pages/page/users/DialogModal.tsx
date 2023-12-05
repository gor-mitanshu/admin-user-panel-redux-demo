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
}

const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Confirm Update</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to update the user?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
