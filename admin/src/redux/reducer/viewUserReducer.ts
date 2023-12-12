import {
  FETCH_VIEW_USER_REQUEST,
  FETCH_VIEW_USER_SUCCESS,
  FETCH_VIEW_USER_FAILURE,
} from "../actionType/viewUserActionType";
import { IUser } from "../type";

interface ViewUserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: ViewUserState = {
  user: null,
  loading: false,
  error: null,
};

const viewUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_VIEW_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_VIEW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case FETCH_VIEW_USER_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default viewUserReducer;
