import { IUser } from "../type";

export const GET_USERS = "GET_USERS";
export const USERS_REQUEST = "USERS_REQUEST";
export const USERS_FAILURE = "USERS_FAILURE";

export interface GetUsersAction {
  type: typeof GET_USERS;
  users: IUser[];
}

export interface UsersRequestAction {
  type: typeof USERS_REQUEST;
}

export interface UsersFailureAction {
  type: typeof USERS_FAILURE;
}

export type IUsersAction =
  | GetUsersAction
  | UsersRequestAction
  | UsersFailureAction;
