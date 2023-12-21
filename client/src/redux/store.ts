import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducer/loginReducer";
import getUserByIdReducer from "./reducer/getUserByIdReducer";
import getLoggedUserReducer from "./reducer/getLoggedUserReducer";

const persistConfig: any = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const rootReducer: any = combineReducers({
  login: loginReducer,
  user: getLoggedUserReducer,
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
