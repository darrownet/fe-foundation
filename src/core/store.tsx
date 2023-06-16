import {combineReducers, Store} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk";

import appReducer, {IAppState, initialAppState} from "./reducers/app-reducer";
import usersReducer, {IUsersState, initialUsersState} from "./reducers/users-reducer";
import userDataReducer, {IUserDetailsState, initialUserDetailsState} from "./reducers/user-details-reducer";

export interface IInitialState {
  app: IAppState,
  users: IUsersState;
  userDetails: IUserDetailsState;
}

export const initialState: IInitialState = {
  app: initialAppState,
  users: initialUsersState,
  userDetails: initialUserDetailsState
}

export const rootReducer = combineReducers({
  app: appReducer,
  users: usersReducer,
  userDetails: userDataReducer
});

export const generateStore = () => {
  const storeConfig = {reducer: rootReducer, preloadedState: initialState, devTools: true, middleware: [thunk]};
  const store: Store<IInitialState, AppAction> & { dispatch: DispatchType } = configureStore(storeConfig);
  return store;
};
