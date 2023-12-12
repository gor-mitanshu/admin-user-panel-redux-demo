import {
  IUserByIdState,
  IUserByIdAction,
  GET_USER_BY_ID,
  USER_BY_ID_REQUEST,
  USER_BY_ID_FAILURE,
} from "../actionType/getUserByIdActionType";

const initialState: IUserByIdState = {
  user: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    picture: "",
    password: "",
    role: "",
    isVerified: false,
    status: "",
  },
  loading: false,
};

const getUserByIdReducer = (
  state = initialState,
  action: IUserByIdAction
): IUserByIdState => {
  switch (action.type) {
    case USER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_USER_BY_ID:
      return { ...state, loading: false, user: action.user };
    case USER_BY_ID_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getUserByIdReducer;
