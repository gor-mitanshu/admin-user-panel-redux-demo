import { Dispatch } from "redux";
import {
  FETCH_VIEW_USER_REQUEST,
  FETCH_VIEW_USER_SUCCESS,
  FETCH_VIEW_USER_FAILURE,
} from "../actionType/viewUserActionType";
import { IUser } from "../type";
import { fetchViewUserService } from "../../service/viewUserService";

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

export const fetchViewUser = (userId: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch(fetchViewUserRequest());
    const token = getState().login.token;
    try {
      if (token) {
        const response: any = await fetchViewUserService(userId, token);
        if (response && response.data) {
          dispatch(fetchViewUserSuccess(response.data.data));
        } else {
          dispatch(fetchViewUserFailure("Failed to fetch user details"));
        }
      } else {
        dispatch(fetchViewUserFailure("Token not found"));
      }
    } catch (error: any) {
      console.error("Error fetching user details:", error);
      dispatch(
        fetchViewUserFailure(
          error.response?.data.message || "Error fetching user details"
        )
      );
    }
  };
};
