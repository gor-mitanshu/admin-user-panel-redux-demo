import {
  FETCH_VIEW_USER_REQUEST,
  FETCH_VIEW_USER_SUCCESS,
  FETCH_VIEW_USER_FAILURE,
} from "../actionType/viewUserActionType";
import { IUser } from "../type";

export const fetchViewUserRequest = () => ({
  type: FETCH_VIEW_USER_REQUEST,
});

export const fetchViewUserSuccess = (user: IUser) => ({
  type: FETCH_VIEW_USER_SUCCESS,
  payload: user,
});

export const fetchViewUserFailure = (error: string) => ({
  type: FETCH_VIEW_USER_FAILURE,
  payload: error,
});
