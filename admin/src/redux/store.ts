import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import getLoggedUserReducer from "./reducer/getLoggedProfileReducer";
import getUsersReducer from "./reducer/getAllUsersReducer";
import getUserCountsReducer from "./reducer/getUserCountsReducer";

const rootReducer: any = combineReducers({
  admin: getLoggedUserReducer,
  users: getUsersReducer,
  userCounts: getUserCountsReducer,
});

const store: any = createStore(rootReducer, applyMiddleware(thunk));

export default store;
