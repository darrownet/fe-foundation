import * as types from "./posts-action-types";
import {IDataService} from "../../services/data.service";
import {AxiosError, AxiosResponse} from "axios";
import {appActionCreators} from "../app/app-action-creators";

interface IPostsActionCreators {
  asyncPostsRequest: Function,
  asyncPostsResponse: Function,
}

interface IPostsActionCreatorsParams {
  dataService: IDataService
}

export function postsActionCreators(params: IPostsActionCreatorsParams): IPostsActionCreators {
  const {dataService} = params;
  const {appRequestError} = appActionCreators();
  const errorStr = "There was an error loading the list of posts.";

  function asyncPostsRequest() {
    return (dispatch: DispatchType) => {
      const onError = (error: Error) => {
        dispatch(appRequestError(errorStr));
      }
      const onFail = () => {
        dispatch(appRequestError(errorStr));
      }
      const onSuccess = (response: AxiosResponse) => {
        dispatch(asyncPostsResponse(response.data));
      }
      dataService.get('posts').then(onSuccess, onFail).catch(onError);
    }
  }

  function asyncPostsResponse(payload: object) {
    return {
      type: types.POSTS_RECEIVED,
      payload
    }
  }

  return {asyncPostsRequest, asyncPostsResponse}

}
