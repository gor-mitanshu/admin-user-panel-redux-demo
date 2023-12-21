import React, { useState, useEffect } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import "../style.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import {
  clearComposeEmailMessage,
  composeEmailFailure,
  composeEmailSuccess,
} from "../../../../../redux/action/composeEmailAction";
import { toast } from "react-toastify";
import DialogModal from "../../dailogueBox/DialogModal";
import { composeEmailService } from "../../../../../service/commonService";

interface ComposeEmailModalProps {
  open: boolean;
  onClose: () => void;
  to: string;
  from: string;
}

const ComposeEmailModal: React.FC<ComposeEmailModalProps> = ({
  open,
  onClose,
  to,
  from,
}) => {
  const [emailFields, setEmailFields] = useState({
    subject: "",
    body: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const loginToken = useSelector((state: RootState) => state.login.token);
  const message = useSelector((state: RootState) => state.composeEmail.message);
  const loading = useSelector((state: RootState) => state.composeEmail.loading);
  const errorMessage = useSelector(
    (state: RootState) => state.composeEmail.error
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
      setEmailFields({
        subject: "",
        body: "",
      });
      onClose();
    }
    dispatch(clearComposeEmailMessage());
  }, [message, onClose, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const handleEmailFieldChange = (field: string, value: string) => {
    setEmailFields({
      ...emailFields,
      [field]: value,
    });
    setUnsavedChanges(true);
  };

  const handleSendClick = async (e: any) => {
    e.preventDefault();
    try {
      if (!emailFields.subject) {
        setError("Please Enter a Subject");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }
      if (!emailFields.body) {
        setError("Body cannot be empty");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }
      const { subject, body } = emailFields;
      const emailData = {
        to: to,
        from: from,
        subject: subject,
        body: body,
      };
      try {
        if (loginToken) {
          const message = await composeEmailService(emailData, loginToken);
          if (message) {
            dispatch(composeEmailSuccess(message));
          } else {
            dispatch(composeEmailFailure("Failed to send email"));
          }
        } else {
          dispatch(composeEmailFailure("Token not found"));
        }
      } catch (error: any) {
        dispatch(
          composeEmailFailure(
            error.response?.data.message || "An error occurred"
          )
        );
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    if (unsavedChanges) {
      setDialogOpen(true);
    } else {
      onClose();
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    setDialogOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="compose-email-modal"
        aria-describedby="compose-email-form"
      >
        <Paper elevation={3} className="modal-container">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCancelClick} disableElevation>
              <Close fontSize="large" color="action" />
            </Button>
          </div>
          <Typography variant="h5" marginBottom={3}>
            Compose an Email to <span style={{ color: "red" }}>{to}</span>
          </Typography>
          {error && (
            <Typography textAlign={"center"} color={"error"} sx={{ mt: 2 }}>
              <b>Error:</b> {error}
            </Typography>
          )}
          <TextField
            label="To"
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
            value={to}
          />
          <TextField
            label="From"
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
            value={from}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            variant="outlined"
            value={emailFields.subject}
            onChange={(e) => handleEmailFieldChange("subject", e.target.value)}
          />
          <TextField
            label="Body"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            value={emailFields.body}
            onChange={(e) => handleEmailFieldChange("body", e.target.value)}
          />
          {!loading ? (
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelClick}
              sx={{ marginRight: "8px" }}
            >
              Cancel
            </Button>
          ) : null}

          <Button variant="contained" color="primary" onClick={handleSendClick}>
            {loading ? <CircularProgress /> : "Send"}
          </Button>
        </Paper>
      </Modal>
      <DialogModal
        isOpen={dialogOpen}
        handleClose={handleDialogClose}
        handleConfirm={handleDialogConfirm}
        title="Confirm Cancel"
        message="You have unsaved changes. Are you sure you want to cancel?"
        confirmButtonText="Yes, Cancel"
        cancelButtonText="No, Continue Editing"
        confirmColor="error"
        cancelColor="primary"
      />
    </>
  );
};

export default ComposeEmailModal;
