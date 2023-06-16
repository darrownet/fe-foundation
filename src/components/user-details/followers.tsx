import React from "react";
import {IFollower} from "../../core/schemas";

interface IFollowersProps {
  count?: number;
  followers?: IFollower[];
}

const Followers: React.FC<IFollowersProps> = ({count = 0, followers = []}) => {
  return(
    <div className="followers">
      <div className="followers-head">
        <h2>followers</h2>
        <span>({count.toLocaleString()} total)</span>
      </div>
      <div>
        <ul>
          {followers.slice(0, 5).map((follower) =>
            <li key={follower.node_id}>
              <a href={follower.html_url} target="_blank" rel="noopener noreferrer">
                <img src={follower.avatar_url}/>
                <span>{follower.login}</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Followers;
