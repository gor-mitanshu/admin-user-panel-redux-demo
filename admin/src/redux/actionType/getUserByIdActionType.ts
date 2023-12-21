import { IUser } from "../type";

export const USER_BY_ID_REQUEST = "USER_BY_ID_REQUEST";
export const USER_BY_ID_FAILURE = "USER_BY_ID_FAILURE";
export const GET_USER_BY_ID = "GET_USER_BY_ID";

export interface IUserByIdState {
  user: IUser | any;
  loading: boolean;
}

export interface IUserByIdAction {
  type:
    | typeof GET_USER_BY_ID
    | typeof USER_BY_ID_REQUEST
    | typeof USER_BY_ID_FAILURE;
  user?: IUser;
}

export type DispatchUserByIdType = (args: IUserByIdAction) => IUserByIdAction;
