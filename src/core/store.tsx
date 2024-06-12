import {combineReducers, Store} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk";

import appReducer, {IAppState, initialAppState} from "./reducers/app-reducer";
import postsReducer, {IPostsState, initialPostsState} from "./reducers/posts-reducer";
import userDataReducer, {IPostDetailsState, initialPostDetailsState} from "./reducers/post-details-reducer";

export interface IInitialState {
  app: IAppState,
  allPosts: IPostsState;
  postDetails: IPostDetailsState;
}

export const initialState: IInitialState = {
  app: initialAppState,
  allPosts: initialPostsState,
  postDetails: initialPostDetailsState
}

export const rootReducer = combineReducers({
  app: appReducer,
  allPosts: postsReducer,
  postDetails: userDataReducer
});

export const generateStore = () => {
  const storeConfig = {reducer: rootReducer, preloadedState: initialState, devTools: true, middleware: [thunk]};
  const store: Store<IInitialState, AppAction> & { dispatch: DispatchType } = configureStore(storeConfig);
  return store;
};
