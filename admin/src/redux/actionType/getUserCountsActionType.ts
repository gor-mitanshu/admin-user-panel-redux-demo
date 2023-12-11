import { AnyAction } from "redux";

export const GET_USER_COUNTS = "GET_USER_COUNTS";
export const USER_COUNTS_REQUEST = "USER_COUNTS_REQUEST";
export const USER_COUNTS_FAILURE = "USER_COUNTS_FAILURE";

export interface GetUserCountsAction extends AnyAction {
  type: typeof GET_USER_COUNTS;
  userCounts: any;
}

export interface UserCountsRequestAction extends AnyAction {
  type: typeof USER_COUNTS_REQUEST;
}

export interface UserCountsFailureAction extends AnyAction {
  type: typeof USER_COUNTS_FAILURE;
}

export type IUserCountsAction =
  | GetUserCountsAction
  | UserCountsRequestAction
  | UserCountsFailureAction;
