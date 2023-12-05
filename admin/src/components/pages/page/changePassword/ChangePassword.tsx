import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {
  Paper,
  TextField,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import DialogModal from "../dailogueBox/DialogModal";

interface IUser {
  password: string;
  cpassword: string;
}

const defaultTheme = createTheme();

const SidebarChangePassword = () => {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUser>({
    password: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: any) => event.preventDefault();

  const showErrorWithTimeout = (errorMessage: string, timeout: number) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, timeout);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmReset = async () => {
    // Perform the reset action
    console.log("Resetting password...");
    try {
      const body = {
        password: user.password,
      };
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/admin/changePassword/${id}`,
        body,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      if (!!res) {
        toast.success("Passwords updated successfully");
        setUser({
          password: "",
          cpassword: "",
        });
      }
    } catch (error: any) {
      console.error(error);
      showErrorWithTimeout(error.response.data.message, 3000);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel</title>
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={5}
            sx={{
              border: "1px",
              marginTop: 4,
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Change Password
              </Typography>
              {error && (
                <Typography marginY={1} textAlign={"center"} color="error">
                  <b>Error:</b> {error}
                </Typography>
              )}
              <Box
                component="form"
                // onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  fullWidth
                  value={user.password}
                  onChange={handleChange}
                  name="password"
                  sx={{ margin: "25px 0 0 0 " }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  type={showPassword ? "text" : "password"}
                  label="Confirm Password"
                  sx={{ margin: "20px 0 0 0" }}
                  fullWidth
                  value={user.cpassword}
                  onChange={handleChange}
                  name="cpassword"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mt: 2, mb: 2, width: "100%" }}
                  onClick={handleOpenDialog}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>

      {/* Dialog for confirming reset */}
      <DialogModal
        isOpen={isDialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmReset}
        title="Confirm Reset"
        message="Are you sure you want to reset your password?"
        cancelButtonText="Cancel"
        confirmButtonText="Reset"
        cancelColor="secondary"
        confirmColor="primary"
      />
    </>
  );
};

export default SidebarChangePassword;
