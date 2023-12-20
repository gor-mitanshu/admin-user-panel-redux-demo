import * as actionTypes from "../actionType/getLoggedUserActionType";
import { DispatchLoggedUserType } from "../type";
import { fetchUserProfile } from "../../service/commonService";

const userProfileRequest = (): actionTypes.UserProfileRequestAction => ({
  type: actionTypes.USER_PROFILE_REQUEST,
});

const userProfileSuccess = (user: any): actionTypes.GetLoggedUserAction => ({
  type: actionTypes.GET_LOGGEDUSER,
  user,
});

const userProfileFailure = (): actionTypes.UserProfileFailureAction => ({
  type: actionTypes.USER_PROFILE_FAILURE,
});

export const getUserProfile = () => {
  return async (dispatch: DispatchLoggedUserType, getState: any) => {
    try {
      dispatch(userProfileRequest());
      const { token } = getState().login;
      if (token) {
        const response = await fetchUserProfile(token);
        if (response && response.data) {
          dispatch(userProfileSuccess(response.data));
        } else {
          console.log("User not found");
          dispatch(userProfileFailure());
        }
      } else {
        console.log("Token not found");
        dispatch(userProfileFailure());
      }
    } catch (error: any) {
      console.log(error.response?.data.message || "An error occurred");
      dispatch(userProfileFailure());
    }
  };
};
