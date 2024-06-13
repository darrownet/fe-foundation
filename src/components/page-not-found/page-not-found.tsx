import {useEffect} from 'react';
import {Link} from "react-router-dom";

const PageNotFound = () => {

  useEffect(() => {
    document.title='\u200E';
  }, []);

  return (
      <div className="page-not-found">
        <h1>404: Page Not Found</h1>
        <Link to='/'>Go to Home</Link>
      </div>
  );
};

export default PageNotFound;
