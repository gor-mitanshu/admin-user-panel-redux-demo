import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actionType/loginActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
