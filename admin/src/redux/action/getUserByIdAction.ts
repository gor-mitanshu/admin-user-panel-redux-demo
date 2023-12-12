import axios from "axios";
import {
  DispatchUserByIdType,
  GET_USER_BY_ID,
  USER_BY_ID_REQUEST,
  USER_BY_ID_FAILURE,
} from "../actionType/getUserByIdActionType";

export const getUserById =
  (id: any) => async (dispatch: DispatchUserByIdType) => {
    dispatch({ type: USER_BY_ID_REQUEST });

    try {
      const accessToken: any = localStorage.getItem("token");
      const accessTokenwithoutQuotes = JSON.parse(accessToken);

      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/getUser/${id}`,
        {
          headers: { Authorization: `Bearer ${accessTokenwithoutQuotes}` },
        }
      );

      const userData = response.data.data;
      dispatch({ type: GET_USER_BY_ID, user: userData });
    } catch (error) {
      dispatch({ type: USER_BY_ID_FAILURE });
    }
  };
