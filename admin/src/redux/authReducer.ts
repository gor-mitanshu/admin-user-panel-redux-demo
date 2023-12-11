import * as actionTypes from "./actionTypes";
import { ILoggedUserAction } from "./type";

const initialState = {
  user: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    picture: "",
    password: "",
    role: "",
  },
  loading: false,
};

const reducer = (state = initialState, action: ILoggedUserAction): any => {
  switch (action.type) {
    case actionTypes.GET_LOGGEDUSER:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case actionTypes.USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
