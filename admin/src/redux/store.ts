import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import getLoggedUserReducer from "./reducer/getLoggedProfileReducer";
import getUsersReducer from "./reducer/getAllUsersReducer";
import getUserCountsReducer from "./reducer/getUserCountsReducer";
import loginReducer from "./reducer/loginReducer";
import viewUserReducer from "./reducer/viewUserReducer";
import composeEmailReducer from "./reducer/composeEmailReducer";
import updateUserReducer from "./reducer/updateUserReducer";
import getUserByIdReducer from "./reducer/getUserByIdReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { Tuple, configureStore } from "@reduxjs/toolkit";

const persistConfig: any = {
  key: "auth",
  storage,
  whitelist: ["loginReducer"],
};

const rootReducer: any = combineReducers({
  admin: getLoggedUserReducer,
  users: getUsersReducer,
  userCounts: getUserCountsReducer,
  login: loginReducer,
  viewUser: viewUserReducer,
  composeEmail: composeEmailReducer,
  userUpdate: updateUserReducer,
  userById: getUserByIdReducer,
});
const persistedReducer: any = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
