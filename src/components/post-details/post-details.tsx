import React, {ChangeEvent, FormEvent, useContext, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from 'react-router-dom';

import {ServiceContext} from "../../core/service-context";

import Navigation from "../navigation/navigation";

import {IInitialState} from "../../core/store";
import {IComment} from "../../core/schemas";

const PostDetails = () => {

  const navigate = useNavigate()

  const appActions = useContext(ServiceContext).actions.app;
  const postActions = useContext(ServiceContext).actions.postDetails;
  const dispatch = useDispatch();

  const error = useSelector((state: IInitialState) => state.app.error) || undefined;
  const selectedPost = useSelector((state: IInitialState) => state.postDetails.post) || {title: '', body: ''};
  const selectedPostComments = useSelector((state: IInitialState) => state.postDetails.comments) || [];

  const params = useParams();
  const [postId] = useState(params.postId);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  const onErrorClear = () => {
    dispatch(appActions.appClearError());
    navigate('/');
  }

  const onFieldChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, fieldName: 'name' | 'email' | 'comment') => {
    const fieldValue = event.currentTarget.value;
    type FieldMapper = { name: Function, email: Function, comment: Function }
    const fieldMapper: FieldMapper = {
      name: () => setNewName(fieldValue),
      email: () => setNewEmail(fieldValue),
      comment: () => setNewComment(fieldValue)
    }
    fieldMapper[fieldName]();
  }

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {name: newName, email: newEmail, body: newComment, postId: parseInt(postId || '')}
    if (newName && newEmail && newComment) {
      dispatch(postActions.asyncPostRequest({actionTypeValue: 'comment', route: `/comments`, method: 'post', data}));
    }
  }

  useEffect(() => {
    dispatch(postActions.asyncPostRequest({actionTypeValue: 'post', route: `/posts/${postId}`, method: 'get'}));
    dispatch(postActions.asyncPostRequest({
      actionTypeValue: 'comments',
      route: `/comments?postId=${postId}`,
      method: 'get'
    }));
  }, []);

  useEffect(() => {
    setNewName('');
    setNewEmail('');
    setNewComment('');
  }, [selectedPostComments]);

  return (
      <>
        {!error ? <>
              <Navigation/>
              <div className="post-details">
                <h1>{selectedPost.title}</h1>
                <p className="post-body">{selectedPost.body}</p>
                <h2>Comments:</h2>
                <div className="comments">
                  <ul>
                    {selectedPostComments.map((comment: IComment, index: number) => {
                      return (
                          <li className="comment" key={`${index}${comment.id}`}>
                            <p>{comment.name}</p>
                            <p>{comment.body}</p>
                          </li>
                      );
                    })}
                  </ul>
                  <form onSubmit={onFormSubmit}>
                    <h3>post a comment!</h3>
                    <div className="label-input">
                      <label htmlFor="name">Name:</label>
                      <input name="name" type="test" value={newName} onChange={(event) => onFieldChange(event, 'name')}/>
                    </div>
                    <div className="label-input">
                      <label htmlFor="email">Email:</label>
                      <input name="email" type="email" value={newEmail}
                             onChange={(event) => onFieldChange(event, 'email')}/>
                    </div>
                    <div className="label-textarea">
                      <label htmlFor="comment">Comment:</label>
                      <textarea name="comment" value={newComment}
                                onChange={(event) => onFieldChange(event, 'comment')}></textarea>
                    </div>
                    <div className="submit">
                      <input name="email" type="submit" value="post"/>
                    </div>
                  </form>
                </div>
              </div>
            </> :
            <div className="post-not-found">
              <p>Invalid post: {postId}</p>
              <a onClick={onErrorClear}>Go to Home</a>
            </div>}
      </>
  );
};

export default PostDetails;
