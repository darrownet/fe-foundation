import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {ServiceContext} from "../../core/service-context";

import {IInitialState} from "../../core/store";
import {IUser} from "../../core/schemas";

const Users = () => {

  const usersAction = useContext(ServiceContext).actions.users;
  const userDetailsAction = useContext(ServiceContext).actions.userDetails;
  const dispatch = useDispatch();

  const users: IUser[] = useSelector((state: IInitialState) => state.users.users);
  const selectedUser = useSelector((state: IInitialState) => state.userDetails.user);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(usersAction.asyncRequestUsers());
    }
    if (selectedUser) {
      dispatch(userDetailsAction.clearUserDetails());
    }
  }, []);

  return (
    <div className="home">
      <ul>
        {users.map((user) => {
          return (
            <li key={user.node_id}>
              <Link to={`/${user.login}`}>
                <img src={user.avatar_url}/>
                <span>{user.login}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
