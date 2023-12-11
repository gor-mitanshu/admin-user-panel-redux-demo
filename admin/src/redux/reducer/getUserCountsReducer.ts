import * as actionTypes from "../actionType/getUserCountsActionType";

const initialState = {
  userCounts: { active: 0, inactive: 0, total: 0 },
  loading: false,
  error: null,
};

const getUserCountsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.USER_COUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_USER_COUNTS:
      return {
        ...state,
        userCounts: action.userCounts,
        loading: false,
        error: null,
      };
    case actionTypes.USER_COUNTS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default getUserCountsReducer;
