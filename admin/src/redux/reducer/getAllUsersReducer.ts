import { IUser } from "../type";
import * as actionTypes from "../actionType/getUsersActionType";

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

const initialState = {
  users: [],
  loading: false,
};

const getUsersReducer = (state = initialState, action: IUsersAction): any => {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case actionTypes.USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USERS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default getUsersReducer;
