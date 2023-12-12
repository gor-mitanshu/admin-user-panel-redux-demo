import { IUserByIdState } from "./actionType/getUserByIdActionType";

// Logged Profile Get thing
export interface IUser {
  _id: any;
  firstname: string;
  lastname: string;
  email: string;
  phone: any;
  picture: string;
  password: string;
  role: string;
  isVerified?: boolean;
  status?: string;
}
export interface ILoggedUser {
  _id: any;
  firstname: string;
  lastname: string;
  email: string;
  phone: any;
  picture: string;
  password: string;
  role: string;
  isVerified?: boolean;
  status?: string;
}
export type ILoggedUserState = {
  user: ILoggedUser;
  loading: boolean;
};

export type ILoggedUserAction =
  | { type: "GET_LOGGEDUSER"; user: ILoggedUser }
  | { type: "USER_PROFILE_REQUEST" }
  | { type: "USER_PROFILE_FAILURE" };

export type DispatchLoggedUserType = (
  args: ILoggedUserAction
) => ILoggedUserAction;

// Users get
export type IUsersState = {
  users: IUser[];
  loading: boolean;
};

export type IUsersAction =
  | { type: "GET_USERS"; users: IUser[] }
  | { type: "USERS_REQUEST" }
  | { type: "USERS_FAILURE" };

export type DispatchUsersType = (args: IUsersAction) => IUsersAction;

// Combine with the existing types
export type IAppState = {
  loggedUser: ILoggedUserState;
  users: IUsersState;
  userById: IUserByIdState;
  login: {
    token: string;
    loading: boolean;
    error: string | null;
  };
};
