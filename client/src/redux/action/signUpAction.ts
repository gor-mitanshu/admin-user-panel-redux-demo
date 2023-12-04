import axios from "axios";

export const signUpSuccess = (userData: any) => ({
  type: "SIGNUP_SUCCESS",
  payload: userData,
});

export const signUpFailure = (error: string) => ({
  type: "SIGNUP_FAILURE",
  payload: error,
});

export const signUpUser = (userData: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/user/signup`,
      userData
    );
    if (!!res) {
      console.log(res);
      dispatch(signUpSuccess(res.data));
    }
  } catch (error: any) {
    console.log(error);
    dispatch(
      //  signUpFailure(error.response?.data?.message || "An error occurred")
      signUpFailure(error.response?.data?.message)
    );
  }
};
