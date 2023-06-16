import * as types from "../actions/app/app-action-types";

export type IAppState = {
  error: string | undefined;
};

export const initialAppState: IAppState = {
  error: undefined
};

const appReducer = (state: IAppState = initialAppState, action: AppAction): IAppState => {
  switch (action.type) {
    case types.REQUEST_ERROR:
      return <IAppState>{...state, ...{error: action.payload}}
    default:
      return state;
  }
};

export default appReducer;
