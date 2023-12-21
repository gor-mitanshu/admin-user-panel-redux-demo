import * as actionTypes from "../actionType/getUserByIdActionType";

export const setUserProfile = (user: any) => ({
  type: actionTypes.SET_USER_PROFILE,
  payload: user,
});
