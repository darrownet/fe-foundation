import * as types from "../actions/posts/posts-action-types";
import {IPost} from "../schemas";

export type IPostsState = {
  posts: IPost[];
  error: object | undefined;
};

export const initialPostsState: IPostsState = {
  posts: [],
  error: undefined
};

const postsReducer = (state: IPostsState = initialPostsState, action: AppAction): IPostsState => {
  switch (action.type) {
    case types.POSTS_RECEIVED:
      return <IPostsState>{...state, ...{posts: action.payload}}
    default:
      return state;
  }
};

export default postsReducer;
