import React, {useEffect} from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import Home from "./home/home";
import UserDetails from "./user-details/user-details";

const AppRoutes = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:login" element={<UserDetails/>}/>
      </Routes>
    </div>
  );
};

export default AppRoutes;
