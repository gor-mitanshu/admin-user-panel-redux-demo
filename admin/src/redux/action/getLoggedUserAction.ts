import * as actionTypes from "../actionType/getLoggedUserActionType";

export const userProfileRequest = (): actionTypes.UserProfileRequestAction => ({
  type: actionTypes.USER_PROFILE_REQUEST,
});

export const userProfileSuccess = (
  user: any
): actionTypes.GetLoggedUserAction => ({
  type: actionTypes.GET_LOGGEDUSER,
  user,
});

export const userProfileFailure = (): actionTypes.UserProfileFailureAction => ({
  type: actionTypes.USER_PROFILE_FAILURE,
});
