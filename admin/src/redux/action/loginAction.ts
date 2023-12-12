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

export const loginSuccess = (user: IUser) => ({
  type: LOGIN_SUCCESS,
  payload: user,
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
    if (!!res) {
      dispatch(loginSuccess(res.data));
    } else {
      console.log(res);
      // dispatch(loginFailure(res.data.message));
    }
  } catch (error: any) {
    dispatch(loginFailure(error.response.data.message));
  }
};
