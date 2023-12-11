export const GET_LOGGEDUSER = "GET_LOGGEDUSER";
export const USER_PROFILE_REQUEST = "USER_PROFILE_REQUEST";
export const USER_PROFILE_FAILURE = "USER_PROFILE_FAILURE";

export interface GetLoggedUserAction {
  type: typeof GET_LOGGEDUSER;
  user: any;
}

export interface UserProfileRequestAction {
  type: typeof USER_PROFILE_REQUEST;
}

export interface UserProfileFailureAction {
  type: typeof USER_PROFILE_FAILURE;
}

export type ILoggedUserAction =
  | GetLoggedUserAction
  | UserProfileRequestAction
  | UserProfileFailureAction;
