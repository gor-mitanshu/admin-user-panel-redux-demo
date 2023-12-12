import axios from "axios";
import { Dispatch } from "redux";
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

export const fetchViewUser = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchViewUserRequest());

    try {
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/user/getUser/${userId}`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );
      dispatch(fetchViewUserSuccess(res.data.data));
    } catch (error: any) {
      dispatch(
        fetchViewUserFailure(
          error.response?.data.message || "Error fetching user details"
        )
      );
    }
  };
};
