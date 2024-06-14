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

enum ActionTypeValues {
  comments = 'comments',
  post = 'post',
}

interface IAsyncPostRequest {
  actionTypeValue: ActionTypeValues;
  route: string;
  method: 'get' | 'post';
  data?: object;
}

const actionTypeMap = {
  clear: types.CLEAR_POST_DETAILS,
  comments: types.COMMENTS_RECEIVED,
  post: types.POST_RECEIVED,
  comment: types.COMMENT_SUBMITTED
}

export function postDetailsActionCreators(params: IPostDetailsActionCreatorsParams): IPostDetailsActionCreators {
  const {dataService} = params;
  const {appRequestError} = appActionCreators();
  const errorStr = "There was an error loading the data for the selected post.";

  function asyncPostRequest(reqParams: IAsyncPostRequest) {
    return (dispatch: DispatchType) => {
      const onError = (error: Error) => {
        error.message = errorStr;
        dispatch(appRequestError(error));
      }
      const onFail = (error: AxiosError) => {
        error.message = errorStr;
        dispatch(appRequestError(error));
      }
      const onSuccess = (response: AxiosResponse) => {
        if (reqParams.method === 'post' && reqParams.data) {
          dispatch(asyncPostResponse(actionTypeMap[reqParams.actionTypeValue], {...response.data, id: response.data.id}));
        }
        if (reqParams.method === 'get'){
          dispatch(asyncPostResponse(actionTypeMap[reqParams.actionTypeValue], response.data));
        }
      }
      if (reqParams.method === 'get') {
        dataService.get(reqParams.route).then(onSuccess, onFail).catch(onError);
      }
      if (reqParams.method === 'post') {
        dataService.post(reqParams.route, reqParams.data).then(onSuccess, onFail).catch(onError);
      }
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
