const initialState = {
  userData: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        error: null,
        loading: false,
      };

    case "SIGNUP_FAILURE":
      return {
        ...state,
        userCredentials: null,
        error: action.payload,
        loading: false,
      };

    case "SIGNIN_SUCCESS":
      return {
        ...state,
        userCredentials: action.payload,
        error: null,
        loading: false,
      };

    case "SIGNIN_FAILURE":
      return {
        ...state,
        userData: null,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
