import React from 'react';
import {Link, useLocation} from "react-router-dom";

const Navigation = () => {

  const location = useLocation();

  return (
    <nav className="navigation">
      <ul>
        <li>
          {(
            location.pathname === '/' ?
              <span className="home-title">
                <h1>list of posts</h1>
              </span> :
              <Link to="/">&#x2190; return to posts</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
