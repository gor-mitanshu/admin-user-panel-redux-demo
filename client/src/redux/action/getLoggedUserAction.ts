import * as actionTypes from "../actionType/getLoggedUserActionType";

export const setUserProfile = (user: any) => ({
  type: actionTypes.SET_USER_PROFILE,
  payload: user,
});
