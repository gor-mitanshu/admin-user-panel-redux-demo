import { getUsersService } from "../../service/commonService";
import * as actionTypes from "../actionType/getUsersActionType";
import { DispatchUsersType } from "../type";

const usersRequest = (): actionTypes.UsersRequestAction => ({
  type: actionTypes.USERS_REQUEST,
});

const usersSuccess = (users: any): actionTypes.GetUsersAction => ({
  type: actionTypes.GET_USERS,
  users,
});

const usersFailure = (): actionTypes.UsersFailureAction => ({
  type: actionTypes.USERS_FAILURE,
});

export const fetchUsers = () => {
  return async (dispatch: DispatchUsersType, getState: any) => {
    try {
      dispatch(usersRequest());
      const token = getState().login.token;
      if (token) {
        const response: any = await getUsersService(token);
        if (response && response.data) {
          dispatch(usersSuccess(response.data.data));
        } else {
          console.log("Users not found");
          dispatch(usersFailure());
        }
      } else {
        console.log("Token not found");
        dispatch(usersFailure());
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      dispatch(usersFailure());
    }
  };
};
