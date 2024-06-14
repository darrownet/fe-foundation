import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {ServiceContext} from "../../core/service-context";

import Navigation from "../navigation/navigation";
import TypeaheadSelectBox from "../typeahead-select-box/typeahead-select-box";

import {IInitialState} from "../../core/store";
import {IPost} from "../../core/typings";

const Posts = () => {

  const postsAction = useContext(ServiceContext).actions.allPosts;
  const postDetailsAction = useContext(ServiceContext).actions.postDetails;
  const dispatch = useDispatch();

  const posts: IPost[] = useSelector((state: IInitialState) => state.allPosts.posts);
  const selectedPost = useSelector((state: IInitialState) => state.postDetails.post);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(postsAction.asyncPostsRequest());
    }
    if (selectedPost) {
      dispatch(postDetailsAction.clearPosts());
    }
    document.title = "Home";
  }, []);

  return (
      <>
        <Navigation/>
        <div className="posts">
          <TypeaheadSelectBox options={posts}/>
        </div>
      </>
  );
};

export default Posts;
