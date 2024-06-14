import {useEffect} from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import Posts from "./posts/posts";
import PostDetails from "./post-details/post-details";
import PageNotFound from "./page-not-found/page-not-found"

const AppRoutes = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/posts/:postId" element={<PostDetails/>}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  );
};

export default AppRoutes;
