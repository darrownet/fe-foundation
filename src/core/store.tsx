import {combineReducers, Store} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk";

import appReducer, {IAppState, initialAppState} from "./reducers/app-reducer";
import postsReducer, {IPostsState, initialPostsState} from "./reducers/posts-reducer";
import userDataReducer, {IUserDetailsState, initialUserDetailsState} from "./reducers/user-details-reducer";

export interface IInitialState {
  app: IAppState,
  posts: IPostsState;
  userDetails: IUserDetailsState;
}

export const initialState: IInitialState = {
  app: initialAppState,
  posts: initialPostsState,
  userDetails: initialUserDetailsState
}

export const rootReducer = combineReducers({
  app: appReducer,
  posts: postsReducer,
  userDetails: userDataReducer
});

export const generateStore = () => {
  const storeConfig = {reducer: rootReducer, preloadedState: initialState, devTools: true, middleware: [thunk]};
  const store: Store<IInitialState, AppAction> & { dispatch: DispatchType } = configureStore(storeConfig);
  return store;
};
