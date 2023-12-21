import * as actionTypes from "../actionType/getUserByIdActionType";

const initialState = {
  user: null,
  loading: false,
};

const getLoggedUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default getLoggedUserReducer;
