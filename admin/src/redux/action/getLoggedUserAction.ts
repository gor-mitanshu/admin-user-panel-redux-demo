import axios from "axios";
import * as actionTypes from "../actionType/getLoggedUserActionType";
import { DispatchLoggedUserType } from "../type";

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

export const fetchUserProfile = () => {
  return async (dispatch: DispatchLoggedUserType, getState: any) => {
    try {
      dispatch(userProfileRequest());
      const token = getState().login.token;
      if (token) {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/admin/loggedProfile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!!res) {
          dispatch(userProfileSuccess(res.data.data));
        } else {
          console.log("User not found");
          dispatch(userProfileFailure());
        }
      } else {
        console.log("error");
        dispatch(userProfileFailure());
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(userProfileFailure());
    }
  };
};
