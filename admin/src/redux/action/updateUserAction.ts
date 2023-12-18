import axios from "axios";
import { Dispatch } from "redux";
import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CLEAR_UPDATE_USER_MESSAGE,
} from "../actionType/updateUserActionTypes";

export const updateUser =
  (userId: string, userData: any) =>
  async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    const token = getState().login.token;
    try {
      const formData = new FormData();

      formData.append("firstname", userData.firstname);
      formData.append("lastname", userData.lastname);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("status", userData.status);

      if (userData.picture instanceof File) {
        formData.append("picture", userData.picture);
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API}/user/update/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data.message,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: error.response?.data?.message || "Failed to update user.",
      });
    }
  };

export const clearUpdateUserMessage = () => ({
  type: CLEAR_UPDATE_USER_MESSAGE,
});
