import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';

import {ServiceContext} from "../../core/service-context";

import Followers from "./followers";
import Orgs from "./orgs";
import Repos from "./reops";

import {IInitialState} from "../../core/store";
import {IFollower, IOrg, IRepo, IPost} from "../../core/schemas";

const UserDetails = () => {

  const actions = useContext(ServiceContext).actions.userDetails;
  const dispatch = useDispatch();

  const followers: IFollower[] = useSelector((state: IInitialState) => state.userDetails.followers);
  const orgs: IOrg[] = useSelector((state: IInitialState) => state.userDetails.orgs);
  const repos: IRepo[] = useSelector((state: IInitialState) => state.userDetails.repos);
  const users: IPost[] = useSelector((state: IInitialState) => state.posts.posts);
  const selectedUser = useSelector((state: IInitialState) => state.userDetails.user);

  const navigate = useNavigate();
  const params = useParams();
  const [login] = useState(params.login);

  // useEffect(() => {
  //   if (users) {
  //     const user = users.find((user) => user.login === login);
  //     if (!user) {
  //       navigate("/");
  //     }
  //     dispatch(actions.asyncUserDataRequest({actionTypeValue: 'user', route: `/users/${login}`}));
  //     dispatch(actions.asyncUserDataRequest({actionTypeValue: 'followers', route: `/users/${login}/followers`}));
  //     dispatch(actions.asyncUserDataRequest({actionTypeValue: 'orgs', route: `/users/${login}/orgs`}));
  //     dispatch(actions.asyncUserDataRequest({actionTypeValue: 'repos', route: `/users/${login}/repos`}));
  //   }
  // }, []);

  return (
    <div className="user-details">
      {/*<div className="avatar-orgs">*/}
      {/*  <div className="avatar-login">*/}
      {/*    <img src={selectedUser && selectedUser.avatar_url}/>*/}
      {/*    <h1>{selectedUser && selectedUser.login}</h1>*/}
      {/*  </div>*/}
      {/*  {orgs.length > 0 && <Orgs orgs={orgs}/>}*/}
      {/*</div>*/}
      {/*{followers.length > 0 && <Followers count={selectedUser ? selectedUser.followers : 0} followers={followers}/>}*/}
      {/*{repos.length > 0 && <Repos repos={repos}/>}*/}
    </div>
  );
};

export default UserDetails;
