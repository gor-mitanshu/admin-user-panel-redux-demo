import { getUserCountService } from "../../service/commonService";
import * as actionTypes from "../actionType/getUserCountsActionType";
import { Dispatch, AnyAction } from "redux";

const userCountsRequest = (): actionTypes.UserCountsRequestAction => ({
  type: actionTypes.USER_COUNTS_REQUEST,
});

const getUserCountsSuccess = (
  userCounts: any
): actionTypes.GetUserCountsAction => ({
  type: actionTypes.GET_USER_COUNTS,
  userCounts,
});

const userCountsFailure = (): actionTypes.UserCountsFailureAction => ({
  type: actionTypes.USER_COUNTS_FAILURE,
});

export const fetchUserCounts = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      dispatch(userCountsRequest());
      const token = getState().login.token;
      if (token) {
        const response = await getUserCountService(token);
        if (response && response.data) {
          dispatch(getUserCountsSuccess(response.data.data));
        } else {
          console.log("User counts not found");
          dispatch(userCountsFailure());
        }
      } else {
        console.log("Token not found");
        dispatch(userCountsFailure());
      }
    } catch (error) {
      console.error("Error fetching user counts:", error);
      dispatch(userCountsFailure());
    }
  };
};
