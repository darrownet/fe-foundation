import * as types from "../actions/post-details/post-details-action-types";
import {IComment,IPost} from "../schemas";

export interface IPostDetailsState {
  comments: IComment[] | undefined;
  error: object | undefined;
  post: IPost | undefined;
}

export const initialPostDetailsState: IPostDetailsState = {
  comments: undefined,
  error: undefined,
  post: undefined,
};

const postDetailsReducer = (state: IPostDetailsState = initialPostDetailsState, action: AppAction): IPostDetailsState => {
  switch (action.type) {
    case types.CLEAR_POST_DETAILS:
      return <IPostDetailsState>{...state, ...{comments: undefined, allPosts: undefined}};
    case types.COMMENTS_RECEIVED:
      return <IPostDetailsState>{...state, ...{comments: action.payload}};
    case types.POST_RECEIVED:
      return <IPostDetailsState>{...state, ...{post: action.payload}};
    default:
      return state;
  }
};

export default postDetailsReducer;
