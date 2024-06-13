import * as types from "./app-action-types";

interface IAppActionCreators {
  appClearError: Function,
  appRequestError: Function
}

export function appActionCreators(): IAppActionCreators {

  function appClearError() {
    console.log('feh');
    return {
      type: types.CLEAR_ERROR
    }
  }

  function appRequestError(payload: string) {
    return {
      type: types.REQUEST_ERROR,
      payload
    }
  }

  return {appClearError, appRequestError}

}
