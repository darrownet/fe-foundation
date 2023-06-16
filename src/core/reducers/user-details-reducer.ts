import * as types from "../actions/user-details/user-details-action-types";
import {IFollower, IRepo, IOrg, IUser} from "../schemas";

export interface IUserDetailsState {
  error: object | undefined;
  followers: IFollower[];
  repos: IRepo[];
  orgs: IOrg[];
  user: IUser | undefined;
}

export const initialUserDetailsState: IUserDetailsState = {
  error: undefined,
  followers: [],
  repos: [],
  orgs: [],
  user: undefined
};

const userDetailsReducer = (state: IUserDetailsState = initialUserDetailsState, action: AppAction): IUserDetailsState => {
  switch (action.type) {
    case types.USER_RECEIVED:
      return <IUserDetailsState>{...state, ...{user: action.payload}};
    case types.USER_FOLLOWERS_RECEIVED:
      return <IUserDetailsState>{...state, ...{followers: action.payload}};
    case types.USER_REPOS_RECEIVED:
      return <IUserDetailsState>{...state, ...{repos: action.payload}};
    case  types.USER_ORGS_RECEIVED:
      return <IUserDetailsState>{...state, ...{orgs: action.payload}};
    case types.CLEAR_USER_DETAILS:
      return <IUserDetailsState>{...state, ...{followers: [], orgs: [], repos: [], user: undefined}};
    default:
      return state;
  }
};

export default userDetailsReducer;
