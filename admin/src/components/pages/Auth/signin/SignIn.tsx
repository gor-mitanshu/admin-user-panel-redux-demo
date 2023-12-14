import React, { useState } from "react";
import {
  Paper,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useAuth } from "../../protectedRoute/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../redux/action/loginAction";
import {
  RootState,
  // store
} from "../../../../redux/store";

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
      <Link target="_blank" color="inherit" to="https://brainsquaretech.com/">
        BrainSquare Tech
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const defaultTheme = createTheme();

const SignIn = () => {
  const { login } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);
  // console.log(loginState);
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });

  const showErrorWithTimeout = (errorMessage: string, timeout: number) => {
    toast.error(errorMessage);
    setTimeout(() => {
      toast.dismiss();
    }, timeout);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // console.log("Before login dispatch:", store.getState());
      await dispatch<any>(loginUser(user));
      // console.log("After login dispatch:", store.getState());

      if (loginState.token) {
        login(loginState.token.data);
        localStorage.setItem("token", JSON.stringify(loginState.token.data));
        navigate(state?.path || "/", { replace: true });
        toast.success("Login successful");
      }
    } catch (error: any) {
      showErrorWithTimeout(error.response.data.message, 3000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel</title>
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {!loginState.loading ? (
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
                  {loginState.error && (
                    <Typography
                      marginTop={1}
                      textAlign={"center"}
                      color="error"
                    >
                      <b>Error:</b> {loginState.error}
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
    </>
  );
};

export default SignIn;
