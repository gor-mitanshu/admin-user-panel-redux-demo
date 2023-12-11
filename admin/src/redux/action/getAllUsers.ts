import axios from "axios";
import { DispatchUsersType, IUser } from "../type";
import * as actionTypes from "../actionType/getUsersActionType";

const usersRequest = (): actionTypes.UsersRequestAction => ({
  type: actionTypes.USERS_REQUEST,
});

const usersSuccess = (users: IUser[]): actionTypes.GetUsersAction => ({
  type: actionTypes.GET_USERS,
  users,
});

const usersFailure = (): actionTypes.UsersFailureAction => ({
  type: actionTypes.USERS_FAILURE,
});

export const fetchUsers = () => {
  return async (dispatch: DispatchUsersType) => {
    try {
      dispatch(usersRequest());

      const accessToken: any = localStorage.getItem("token");
      const accessTokenWithoutQuotes = JSON.parse(accessToken);

      const res = await axios.get(
        `${process.env.REACT_APP_API}/user/getUsers`,
        {
          headers: { Authorization: `Bearer ${accessTokenWithoutQuotes}` },
        }
      );

      if (!!res) {
        dispatch(usersSuccess(res.data.data));
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(usersFailure());
    }
  };
};
