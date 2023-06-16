import * as types from "./users-action-types";
import {IDataService} from "../../services/data.service";
import {AxiosError, AxiosResponse} from "axios";

import {appActionCreators} from "../app/app-action-creators";

interface IUsersActionCreators {
  asyncRequestUsers: Function,
  asyncDataResponse: Function,
}

interface IUsersActionCreatorsParams {
  dataService: IDataService
}

export function usersActionCreators(params: IUsersActionCreatorsParams): IUsersActionCreators {
  const {dataService} = params;
  const {appRequestError} = appActionCreators();
  const errorStr = "There was an error loading the list of github users.";

  function asyncRequestUsers() {
    return (dispatch: DispatchType) => {
      const onError = (error: Error) => {
        dispatch(appRequestError(errorStr));
      }
      const onFail = (error: AxiosError) => {
        dispatch(appRequestError(errorStr));
      }
      const onSuccess = (response: AxiosResponse) => {
        dispatch(asyncDataResponse(response.data));
      }
      dataService.get('users').then(onSuccess, onFail).catch(onError);
    }
  }

  function asyncDataResponse(payload: object) {
    return {
      type: types.USERS_RECEIVED,
      payload
    }
  }

  return {asyncRequestUsers, asyncDataResponse}

}
