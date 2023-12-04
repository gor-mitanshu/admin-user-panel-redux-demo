const initialState = {
  user: null,
  loading: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ADMIN_PROFILE":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
