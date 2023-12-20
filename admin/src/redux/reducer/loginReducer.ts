import { TOKEN_UPDATE } from "../actionType/loginActionType";

const initialState = {
  token: null,
};

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOKEN_UPDATE:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
