import * as types from "./post-details-action-types";
import {IDataService} from "../../services/data.service";
import {AxiosError, AxiosResponse} from "axios";

import {appActionCreators} from "../app/app-action-creators";

interface IPostDetailsActionCreators {
  asyncPostDataRequest: Function,
  asyncPostDataResponse: Function,
  clearPostDetails: Function
}

interface IPostDetailsActionCreatorsParams {
  dataService: IDataService
}

interface IAsyncPostDataRequest {
  postId: number;
}

export function postDetailsActionCreators(params: IPostDetailsActionCreatorsParams): IPostDetailsActionCreators {
  const {dataService} = params;
  const {appRequestError} = appActionCreators();
  const errorStr = "There was an error loading the data for the selected post.";

  function asyncPostDataRequest(reqParams: IAsyncPostDataRequest) {
    return (dispatch: DispatchType) => {
      const onError = (error: Error) => {
        dispatch(appRequestError(errorStr));
      }
      const onFail = (error: AxiosError) => {
        dispatch(appRequestError(errorStr));
      }
      const onSuccess = (response: AxiosResponse) => {
        dispatch(asyncPostDataResponse(types.POST_RECEIVED, response.data));
      }
      dataService.get(`posts/${reqParams.postId}`).then(onSuccess, onFail).catch(onError);
    }
  }

  function asyncPostDataResponse(type: string, payload: object): AppAction {
    return {type, payload}
  }

  function clearPostDetails(): AppAction {
    return {
      type: types.CLEAR_POST_DETAILS
    }
  }

  return {asyncPostDataRequest, asyncPostDataResponse, clearPostDetails}

}
