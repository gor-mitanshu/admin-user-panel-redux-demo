import { getUserByIdService } from "../../service/getUserByIdService";
import {
  DispatchUserByIdType,
  GET_USER_BY_ID,
  USER_BY_ID_REQUEST,
  USER_BY_ID_FAILURE,
} from "../actionType/getUserByIdActionType";

export const getUserById =
  (id: any) => async (dispatch: DispatchUserByIdType, getState: any) => {
    dispatch({ type: USER_BY_ID_REQUEST });
    try {
      const token = getState().login.token;
      if (token) {
        const response = await getUserByIdService(id, token);
        if (response && response.data) {
          const userData = response.data.data;
          dispatch({ type: GET_USER_BY_ID, user: userData });
        } else {
          console.log("User not found");
          dispatch({ type: USER_BY_ID_FAILURE });
        }
      } else {
        console.log("Token not found");
        dispatch({ type: USER_BY_ID_FAILURE });
      }
    } catch (error) {
      console.error("Error fetching user by id:", error);
      dispatch({ type: USER_BY_ID_FAILURE });
    }
  };
