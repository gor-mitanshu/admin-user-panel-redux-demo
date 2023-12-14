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
  console.log(user);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/admin/signin`,
      user
    );
    if (!!res) {
      dispatch(loginSuccess(res.data));
      return res;
    }
  } catch (error: any) {
    console.error("Login Error:", error);
    dispatch(
      loginFailure(error.response?.data?.message || "An error occurred")
    );
  }
};
