import * as actionTypes from "../actionType/getUserByIdActionType";

export const userByIdRequest = (): any => ({
  type: actionTypes.USER_BY_ID_REQUEST,
});

export const getUserByIdSuccess = (user: any): any => ({
  type: actionTypes.GET_USER_BY_ID,
  user,
});

export const getUserByIdFailiure = (): any => ({
  type: actionTypes.USER_BY_ID_FAILURE,
});
