import * as types from "./app-action-types";

interface IAppActionCreators {
  appRequestError: Function,
}

export function appActionCreators(): IAppActionCreators {

  function appRequestError(payload: string) {
    return {
      type: types.REQUEST_ERROR,
      payload
    }
  }

  return {appRequestError}

}
