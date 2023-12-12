import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import getLoggedUserReducer from "./reducer/getLoggedProfileReducer";
import getUsersReducer from "./reducer/getAllUsersReducer";
import getUserCountsReducer from "./reducer/getUserCountsReducer";
import loginReducer from "./reducer/loginReducer";
import viewUserReducer from "./reducer/viewUserReducer";
import composeEmailReducer from "./reducer/composeEmailReducer";
import updateUserReducer from "./reducer/updateUserReducer";

const rootReducer: any = combineReducers({
  admin: getLoggedUserReducer,
  users: getUsersReducer,
  userCounts: getUserCountsReducer,
  login: loginReducer,
  viewUser: viewUserReducer,
  composeEmail: composeEmailReducer,
  userUpdate: updateUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store: any = createStore(rootReducer, applyMiddleware(thunk));

export default store;
