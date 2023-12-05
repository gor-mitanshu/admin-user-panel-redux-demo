import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: (confirmed: boolean) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  onConfirm,
}) => {
  return (
    <Dialog open={true} onClose={() => onConfirm(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => onConfirm(false)}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm(true)}
          color="error"
          variant="contained"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
