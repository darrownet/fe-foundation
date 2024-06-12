import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';

import {ServiceContext} from "../../core/service-context";

import {IInitialState} from "../../core/store";
import {IComment} from "../../core/schemas";

const PostDetails = () => {

  const actions = useContext(ServiceContext).actions.postDetails;
  const dispatch = useDispatch();

  const selectedPost = useSelector((state: IInitialState) => state.postDetails.post);
  const selectedPostComments = useSelector((state: IInitialState) => state.postDetails.comments);

  const navigate = useNavigate();
  const params = useParams();
  const [postId] = useState(params.postId);

  useEffect(() => {
    dispatch(actions.asyncPostDataRequest({actionTypeValue: 'post', route: `/posts/${postId}`}));
    dispatch(actions.asyncPostDataRequest({actionTypeValue: 'comments', route: `/comments?postId=${postId}`}));
  }, []);

  return (
    <div className="user-details">
      <h1>{selectedPost?.title}</h1>
      <p>{selectedPost?.body}</p>
      <ul>
        {selectedPostComments?.map((comment:IComment) => {
          return (
              <li key={comment.id}>
                <p>{comment.name}</p>
                <p>{comment.body}</p>
              </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostDetails;
