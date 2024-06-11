import React, {useEffect} from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import Posts from "./posts/posts";
import UserDetails from "./post-details/post-details";

const AppRoutes = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/posts/:postId" element={<UserDetails/>}/>
      </Routes>
    </div>
  );
};

export default AppRoutes;
