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
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(userCountsRequest());

      const accessToken: any = localStorage.getItem("token");
      const accessTokenWithoutQuotes = JSON.parse(accessToken);

      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/getUserCounts`,
        {
          headers: { Authorization: `Bearer ${accessTokenWithoutQuotes}` },
        }
      );

      const { data } = response.data;
      dispatch(getUserCountsSuccess(data));
    } catch (error) {
      console.error("Error fetching user counts:", error);
      dispatch(userCountsFailure());
    }
  };
};
