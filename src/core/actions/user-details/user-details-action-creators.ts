import * as types from "./user-details-action-types";
import {IDataService} from "../../services/data.service";
import {AxiosError, AxiosResponse} from "axios";

import {appActionCreators} from "../app/app-action-creators";

interface IUserDetailsActionCreators {
  asyncUserDataRequest: Function,
  asyncUserDataResponse: Function,
  clearUserDetails: Function
}

interface IUserDetailsActionCreatorsParams {
  dataService: IDataService
}

enum ActionTypeValues {
  followers = 'followers',
  orgs = 'orgs',
  repos = 'repos'
}

interface IAsyncUserDataRequest {
  actionTypeValue: ActionTypeValues;
  route: string;
}

const actionTypeMap = {
  clear: types.CLEAR_USER_DETAILS,
  followers: types.USER_FOLLOWERS_RECEIVED,
  orgs: types.USER_ORGS_RECEIVED,
  repos: types.USER_REPOS_RECEIVED,
  user: types.USER_RECEIVED
}

export function userDetailsActionCreators(params: IUserDetailsActionCreatorsParams): IUserDetailsActionCreators {
  const {dataService} = params;
  const {appRequestError} = appActionCreators();
  const errorStr = "There was an error loading the data for the selected github user.";

  function asyncUserDataRequest(reqParams: IAsyncUserDataRequest) {
    return (dispatch: DispatchType) => {
      const onError = (error: Error) => {
        dispatch(appRequestError(errorStr));
      }
      const onFail = (error: AxiosError) => {
        dispatch(appRequestError(errorStr));
      }
      const onSuccess = (response: AxiosResponse) => {
        dispatch(asyncUserDataResponse(actionTypeMap[reqParams.actionTypeValue], response.data));
      }
      dataService.get(reqParams.route).then(onSuccess, onFail).catch(onError);
    }
  }

  function asyncUserDataResponse(type: string, payload: object): AppAction {
    return {type, payload}
  }

  function clearUserDetails(): AppAction {
    return {
      type: types.CLEAR_USER_DETAILS
    }
  }

  return {asyncUserDataRequest, asyncUserDataResponse, clearUserDetails}

}
