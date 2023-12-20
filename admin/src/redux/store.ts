import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import getLoggedUserReducer from "./reducer/getLoggedProfileReducer";
import getUsersReducer from "./reducer/getAllUsersReducer";
import getUserCountsReducer from "./reducer/getUserCountsReducer";
import loginReducer from "./reducer/loginReducer";
import viewUserReducer from "./reducer/viewUserReducer";
import composeEmailReducer from "./reducer/composeEmailReducer";
import getUserByIdReducer from "./reducer/getUserByIdReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig: any = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const rootReducer: any = combineReducers({
  admin: getLoggedUserReducer,
  users: getUsersReducer,
  userCounts: getUserCountsReducer,
  login: loginReducer,
  viewUser: viewUserReducer,
  composeEmail: composeEmailReducer,
  userById: getUserByIdReducer,
});

const persistedReducer: any = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
  // devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };
