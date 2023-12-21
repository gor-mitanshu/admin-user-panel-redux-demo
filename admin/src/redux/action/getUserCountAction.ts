import * as actionTypes from "../actionType/getUserCountsActionType";

export const userCountsRequest = (): actionTypes.UserCountsRequestAction => ({
  type: actionTypes.USER_COUNTS_REQUEST,
});

export const getUserCountsSuccess = (
  userCounts: any
): actionTypes.GetUserCountsAction => ({
  type: actionTypes.GET_USER_COUNTS,
  userCounts,
});

export const userCountsFailure = (): actionTypes.UserCountsFailureAction => ({
  type: actionTypes.USER_COUNTS_FAILURE,
});
