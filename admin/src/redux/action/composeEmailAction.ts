import { composeEmailService } from "../../service/commonService";
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
        const message = await composeEmailService(emailData, token);
        console.log(message);
        if (message) {
          dispatch(composeEmailSuccess(message));
        } else {
          dispatch(composeEmailFailure("Failed to send email"));
        }
      } else {
        dispatch(composeEmailFailure("Token not found"));
      }
    } catch (error: any) {
      dispatch(
        composeEmailFailure(error.response?.data.message || "An error occurred")
      );
    }
  };
