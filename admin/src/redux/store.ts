import { createStore, applyMiddleware, Store } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./authReducer";
import {
  DispatchLoggedUserType,
  ILoggedUserAction,
  ILoggedUserState,
} from "./type";

const store: Store<ILoggedUserState, ILoggedUserAction> & {
  dispatch: DispatchLoggedUserType;
} = createStore(reducer, applyMiddleware(thunk));

export default store;
