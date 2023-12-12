import {
  COMPOSE_EMAIL_REQUEST,
  COMPOSE_EMAIL_SUCCESS,
  COMPOSE_EMAIL_FAILURE,
  CLEAR_COMPOSE_EMAIL_MESSAGE,
} from "../actionType/composeEmailActionType";

const initialState = {
  loading: false,
  message: "",
  error: null,
};

const composeEmailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case COMPOSE_EMAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case COMPOSE_EMAIL_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case COMPOSE_EMAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_COMPOSE_EMAIL_MESSAGE:
      return { ...state, message: "" };
    default:
      return state;
  }
};

export default composeEmailReducer;
