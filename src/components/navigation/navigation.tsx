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
                <p>list of posts</p>
                <span>...in 80s Brutalist Deco</span>
              </span> :
              <Link to="/">&#x2190;back</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
