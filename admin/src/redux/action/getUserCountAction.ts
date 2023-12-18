import axios from "axios";
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
        const response = await axios.get(
          `${process.env.REACT_APP_API}/user/getUserCounts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { data } = response.data;
        dispatch(getUserCountsSuccess(data));
      }
    } catch (error) {
      console.error("Error fetching user counts:", error);
      dispatch(userCountsFailure());
    }
  };
};
