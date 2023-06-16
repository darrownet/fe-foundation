import React from "react";
import {IOrg} from "../../core/schemas";

interface IOrgsProps {
  orgs?: IOrg[];
}

const Orgs: React.FC<IOrgsProps> = ({orgs = []}) => {
  return(
    <div className="orgs">
      <div className="orgs-head">
        <h2>organizations</h2>
      </div>
      <ul className={orgs.length > 7 ? 'scroll' : ''}>
        {orgs.map((org) =>
          <li key={org.node_id}>
            <a href={`https://github.com/${org.login}`} target="_blank" rel="noopener noreferrer">
              <img src={org.avatar_url}/>
              <div>
                <p>{org.login}</p>
                <p className="org-description">{org.description && org.description}</p>
              </div>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Orgs;