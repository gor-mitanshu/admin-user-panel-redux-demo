import axios from "axios";
import { Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actionType/loginActionType";

interface IUser {
  email: string;
  password: string;
}

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (token: string) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (user: IUser) => async (dispatch: Dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/admin/signin`,
      user
    );

    if (!!res && res.data && res.data.success === true && res.status === 200) {
      dispatch(loginSuccess(res.data.data));
      return res;
    } else {
      console.log(res, "error");
    }
  } catch (error: any) {
    console.error("Login Error:", error);
    dispatch(
      loginFailure(error.response?.data?.message || "An error occurred")
    );
  }
};
