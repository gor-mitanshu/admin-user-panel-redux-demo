import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CLEAR_UPDATE_USER_MESSAGE,
} from "../actionType/updateUserActionTypes";

interface IUpdateUserState {
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: IUpdateUserState = {
  loading: false,
  message: null,
  error: null,
};

const updateUserReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, message: null, error: null };

    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };

    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, message: null, error: action.payload };

    case CLEAR_UPDATE_USER_MESSAGE:
      return { ...state, message: null, error: null };

    default:
      return state;
  }
};

export default updateUserReducer;
