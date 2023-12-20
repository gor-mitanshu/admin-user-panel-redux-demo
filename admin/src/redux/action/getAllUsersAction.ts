import * as actionTypes from "../actionType/getUsersActionType";

export const usersRequest = (): actionTypes.UsersRequestAction => ({
  type: actionTypes.USERS_REQUEST,
});

export const usersSuccess = (users: any): actionTypes.GetUsersAction => ({
  type: actionTypes.GET_USERS,
  users,
});

export const usersFailure = (): actionTypes.UsersFailureAction => ({
  type: actionTypes.USERS_FAILURE,
});
