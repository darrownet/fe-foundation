import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {ServiceContext} from "../../core/service-context";

import {IconFilter} from "../icons";

import {IInitialState} from "../../core/store";
import {IPost} from "../../core/schemas";

const Posts = () => {

  const postsAction = useContext(ServiceContext).actions.posts;
  const postDetailsAction = useContext(ServiceContext).actions.userDetails;
  const dispatch = useDispatch();

  const posts: IPost[] = useSelector((state: IInitialState) => state.posts.posts);
  const selectedPost = useSelector((state: IInitialState) => state.userDetails.user);

  const [filterValue, setFilterValue] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const onFilterChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setFilterValue(value);
  }

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(postsAction.asyncRequestPosts());
    }
    if (selectedPost) {
      dispatch(postDetailsAction.clearUserDetails());
    }
  }, []);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    const filtered = posts.filter((post) => {
      return post.title.toLowerCase().includes(filterValue.toLowerCase());
    });
    setFilteredPosts(filtered);
  }, [filterValue]);

  return (
    <div className="posts">
      <div className="filter-posts">
        <div className="filter-icon">
          <IconFilter color="#EFEEEE" height="28" width="28" />
        </div>
        <input name="filter-posts"
               placeholder="filter em' here..."
               className={filterValue.length > 0 ? 'filter-active' : ''}
               value={filterValue} onChange={onFilterChange} />
      </div>
      <ul>
        {filteredPosts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/${post.id}`}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
