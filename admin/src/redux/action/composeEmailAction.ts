import axios from "axios";
import {
  COMPOSE_EMAIL_REQUEST,
  COMPOSE_EMAIL_SUCCESS,
  COMPOSE_EMAIL_FAILURE,
  CLEAR_COMPOSE_EMAIL_MESSAGE,
} from "../actionType/composeEmailActionType";
import { Dispatch } from "redux";

export const composeEmailRequest = () => ({
  type: COMPOSE_EMAIL_REQUEST,
});

export const composeEmailSuccess = (message: string) => ({
  type: COMPOSE_EMAIL_SUCCESS,
  payload: message,
});

export const composeEmailFailure = (error: string) => ({
  type: COMPOSE_EMAIL_FAILURE,
  payload: error,
});

export const clearComposeEmailMessage = () => ({
  type: CLEAR_COMPOSE_EMAIL_MESSAGE,
});

export const composeEmail =
  (emailData: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch(composeEmailRequest());
    try {
      const token = getState().login.token;
      if (token) {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/admin/sendMail`,
          emailData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(composeEmailSuccess(res.data.message));
      }
    } catch (error: any) {
      dispatch(composeEmailFailure(error.response.data.message));
    }
  };
