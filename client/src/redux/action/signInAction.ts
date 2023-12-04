import axios from "axios";

export const signInSuccess = (userData: any) => ({
  type: "SIGNIN_SUCCESS",
  payload: userData,
});

export const signInFailure = (error: string) => ({
  type: "SIGNIN_FAILURE",
  payload: error,
});

export const signInUser = (userCredentials: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/user/signin`,
      userCredentials
    );

    if (!!res) {
      if (!res.data.isVerified) {
        dispatch(
          signInFailure(
            "Email not verified. Please verify your email to log in."
          )
        );
      }
      dispatch(signInSuccess(res.data));
      localStorage.setItem("token", JSON.stringify(res.data.data));
    }
  } catch (error: any) {
    dispatch(
      signInFailure(error.response?.data?.message || "An error occurred")
    );
  }
};
