import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import userdataReducer from "../reducer/userdata.reducer";

const reducers = combineReducers({
  userData: userdataReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });

export const store = createStore();

setupListeners(store.dispatch);
