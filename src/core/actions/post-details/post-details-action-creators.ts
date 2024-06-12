import * as types from "./post-details-action-types";
import {IDataService} from "../../services/data.service";
import {AxiosError, AxiosResponse} from "axios";

import {appActionCreators} from "../app/app-action-creators";

interface IPostDetailsActionCreators {
  asyncPostRequest: Function,
  asyncPostResponse: Function,
  clearPosts: Function
}

interface IPostDetailsActionCreatorsParams {
  dataService: IDataService
}

interface IAsyncPostDataRequest {
  postId: number;
}

enum ActionTypeValues {
  comments = 'comments',
  post = 'post',
}

interface IAsyncPostDataRequest {
  actionTypeValue: ActionTypeValues;
  route: string;
}

const actionTypeMap = {
  clear: types.CLEAR_POST_DETAILS,
  comments: types.COMMENTS_RECEIVED,
  post: types.POST_RECEIVED
}

export function postDetailsActionCreators(params: IPostDetailsActionCreatorsParams): IPostDetailsActionCreators {
  const {dataService} = params;
  const {appRequestError} = appActionCreators();
  const errorStr = "There was an error loading the data for the selected post.";

  function asyncPostRequest(reqParams: IAsyncPostDataRequest) {
    return (dispatch: DispatchType) => {
      const onError = (error: Error) => {
        dispatch(appRequestError(errorStr));
      }
      const onFail = (error: AxiosError) => {
        dispatch(appRequestError(errorStr));
      }
      const onSuccess = (response: AxiosResponse) => {
        dispatch(asyncPostResponse(actionTypeMap[reqParams.actionTypeValue], response.data));
      }
      dataService.get(reqParams.route).then(onSuccess, onFail).catch(onError);
    }
  }

  function asyncPostResponse(type: string, payload: object): AppAction {
    return {type, payload}
  }

  function clearPosts(): AppAction {
    return {
      type: types.CLEAR_POST_DETAILS
    }
  }

  return {asyncPostRequest, asyncPostResponse, clearPosts}

}
