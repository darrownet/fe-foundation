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
    <div className="post-details">
      <h1>{selectedPost?.title}</h1>
      <p className="post-body">{selectedPost?.body}</p>
      <h2>Comments:</h2>
      <div className="comments">
        <ul>
          {selectedPostComments?.map((comment: IComment) => {
            return (
                <li className="comment" key={comment.id}>
                  <p>{comment.name}</p>
                  <p>{comment.body}</p>
                </li>
            );
          })}
        </ul>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input name="name" type="test"/>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input name="email" type="email"/>
          </div>
          <div>
            <label htmlFor="comment">Comment:</label>
            <textarea name="comment"></textarea>
          </div>
          <div>
            <input name="email" type="submit" value="post"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
