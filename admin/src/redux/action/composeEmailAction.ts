import {
  COMPOSE_EMAIL_REQUEST,
  COMPOSE_EMAIL_SUCCESS,
  COMPOSE_EMAIL_FAILURE,
  CLEAR_COMPOSE_EMAIL_MESSAGE,
} from "../actionType/composeEmailActionType";

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
