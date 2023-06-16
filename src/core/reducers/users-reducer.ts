import * as types from "../actions/users/users-action-types";
import {IUser} from "../schemas/User";

export type IUsersState = {
  users: IUser[];
  error: object | undefined;
};

export const initialUsersState: IUsersState = {
  users: [],
  error: undefined
};

const usersReducer = (state: IUsersState = initialUsersState, action: AppAction): IUsersState => {
  switch (action.type) {
    case types.USERS_RECEIVED:
      return <IUsersState>{...state, ...{users: action.payload}}
    default:
      return state;
  }
};

export default usersReducer;
