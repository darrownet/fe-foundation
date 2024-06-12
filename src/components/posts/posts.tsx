import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {ServiceContext} from "../../core/service-context";

import TypeaheadSelectBox from "../ui-elements/typeahead-select-box/typeahead-select-box";

import {IInitialState} from "../../core/store";
import {IPost} from "../../core/schemas";

const Posts = () => {

  const postsAction = useContext(ServiceContext).actions.posts;
  const postDetailsAction = useContext(ServiceContext).actions.postDetails;
  const dispatch = useDispatch();

  const posts: IPost[] = useSelector((state: IInitialState) => state.posts.posts);
  const selectedPost = useSelector((state: IInitialState) => state.postDetails.post);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(postsAction.asyncRequestPosts());
    }
    if (selectedPost) {
      dispatch(postDetailsAction.clearPostDetails());
    }
  }, []);

  return (
    <div className="posts">
      <TypeaheadSelectBox options={posts} />
    </div>
  );
};

export default Posts;
