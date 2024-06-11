import * as types from "../actions/user-details/post-details-action-types";
import {IPost} from "../schemas";

export interface IPostDetailsState {
  error: object | undefined;
  post: IPost | undefined;
}

export const initialPostDetailsState: IPostDetailsState = {
  error: undefined,
  post: undefined
};

const postDetailsReducer = (state: IPostDetailsState = initialPostDetailsState, action: AppAction): IPostDetailsState => {
  switch (action.type) {
    case types.POST_RECEIVED:
      return <IPostDetailsState>{...state, ...{user: action.payload}};
    case types.CLEAR_POST_DETAILS:
      return <IPostDetailsState>{...state, ...{post: undefined}};
    default:
      return state;
  }
};

export default postDetailsReducer;
