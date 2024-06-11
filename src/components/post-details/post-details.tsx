import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';

import {ServiceContext} from "../../core/service-context";

import {IInitialState} from "../../core/store";
import {IPost} from "../../core/schemas";

const PostDetails = () => {

  const actions = useContext(ServiceContext).actions.userDetails;
  const dispatch = useDispatch();

  const selectedPost = useSelector((state: IInitialState) => state.userDetails.post);

  const navigate = useNavigate();
  const params = useParams();
  const [postId] = useState(params.postId);

  useEffect(() => {
    // if (users) {
    //   const user = users.find((user) => user.login === login);
    //   if (!user) {
    //     navigate("/");
    //   }
    //   dispatch(actions.asyncUserDataRequest({actionTypeValue: 'user', route: `/users/${login}`}));
    //   dispatch(actions.asyncUserDataRequest({actionTypeValue: 'followers', route: `/users/${login}/followers`}));
    //   dispatch(actions.asyncUserDataRequest({actionTypeValue: 'orgs', route: `/users/${login}/orgs`}));
    //   dispatch(actions.asyncUserDataRequest({actionTypeValue: 'repos', route: `/users/${login}/repos`}));
    // }
    console.log(postId);
  }, []);

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

export default PostDetails;
