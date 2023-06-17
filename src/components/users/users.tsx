import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {ServiceContext} from "../../core/service-context";

import {IconFilter} from "../icons";

import {IInitialState} from "../../core/store";
import {IUser} from "../../core/schemas";

const Users = () => {

  const usersAction = useContext(ServiceContext).actions.users;
  const userDetailsAction = useContext(ServiceContext).actions.userDetails;
  const dispatch = useDispatch();

  const users: IUser[] = useSelector((state: IInitialState) => state.users.users);
  const selectedUser = useSelector((state: IInitialState) => state.userDetails.user);

  const [filterValue, setFilterValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const onFilterChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setFilterValue(value);
  }

  useEffect(() => {
    if (users.length === 0) {
      dispatch(usersAction.asyncRequestUsers());
    }
    if (selectedUser) {
      dispatch(userDetailsAction.clearUserDetails());
    }
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      return user.login.toLowerCase().includes(filterValue.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [filterValue]);

  return (
    <div className="users">
      <div className="filter-users">
        <div className="filter-icon">
          <IconFilter color="#EFEEEE" height="28" width="28" />
        </div>
        <input value={filterValue} onChange={onFilterChange} />
      </div>
      <ul>
        {filteredUsers.map((user) => {
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
