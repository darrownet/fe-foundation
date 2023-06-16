import React from "react";
import {IRepo} from "../../core/schemas";

import {IconCodeFork, IconStar} from "../icons";
import {Link} from "react-router-dom";

interface IReposProps {
  repos?: IRepo[];
}

const Repos: React.FC<IReposProps> = ({repos = []}) => {
  return(
    <div className="repos">
      <h2>repositories</h2>
      <ul>
        {repos.map((repo) =>
          <li key={repo.node_id}>
            <div className="repo">
              <h3 className="repo-name">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
              </h3>
              <div className="repo-stars-watchers">
                <span>
                  <div><IconStar color="#EFEEEE" height="22px" width="22px" /></div>
                  <div>{repo.stargazers_count}</div>
                </span>
                <span>
                  <div><IconCodeFork color="#EFEEEE" height="22px" width="22px"/></div>
                  <div>{repo.forks_count}</div>
                </span>
              </div>
            </div>
            {repo.description && <div className="repo-description">{repo.description}</div>}
          </li>
        )}
      </ul>
      <Link to="/">&#x2190;back</Link>
    </div>
  );
}

export default Repos;