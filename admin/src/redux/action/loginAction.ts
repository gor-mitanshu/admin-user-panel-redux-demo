import { Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actionType/loginActionType";
import * as authService from "../../service/commonService";

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

export const loginUser =
  (user: authService.ILogin) => async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await authService.login(user);
      const data = response.data;
      dispatch(loginSuccess(data));
      return data;
    } catch (error: any) {
      console.error("Login Error:", error);
      dispatch(loginFailure(error));
    }
  };
