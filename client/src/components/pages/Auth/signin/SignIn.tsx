import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {
  Paper,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../protectedRoute/AuthContext";
import * as authService from "../../../../service/commonService";
import { loginTokenUpdate } from "../../../../redux/action/loginAction";
import { useDispatch } from "react-redux";

interface IUser {
  email: string;
  password: string;
}
const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://brainsquaretech.com/">
        BrainSquare Tech
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const defaultTheme = createTheme();

const SignIn = ({ height, width }: any) => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await authService.signIn(user);
      if (response && response.success === true) {
        setLoading(false);
        if (response.isVerified !== true) {
          showErrorWithTimeout(
            "Email not verified. Please verify your email to log in.",
            3000
          );
          setTimeout(() => {
            toast.warn("Verify your email first.");
          }, 1000);
        } else {
          const data = response.data;
          dispatch(loginTokenUpdate(data));
          login(data);
          navigate(state?.path || "/dashboard", { replace: true });
          toast.success(response.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      setLoading(false);
      showErrorWithTimeout(error, 3000);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {!loading ? (
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
              }}
            >
              <>
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                {error && (
                  <Typography marginTop={1} textAlign={"center"} color="error">
                    <b>Error:</b> {error}
                  </Typography>
                )}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 0 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={user.email}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid item xs textAlign={"center"} marginBottom={1}>
                    <Link to={"/forgetpassword"}>Forgot password?</Link>
                  </Grid>
                  <Grid item textAlign={"center"} marginBottom={1}>
                    <Link to={"/signup"}>Don't have an account? Sign Up</Link>
                  </Grid>
                </Box>
              </>
            </Box>
            <Copyright sx={{ my: 2 }} />
          </Paper>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
