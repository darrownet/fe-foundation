import {appActionCreators} from "../actions/app/app-action-creators";
import {postsActionCreators} from "../actions/posts/posts-action-creators";
import {userDetailsActionCreators} from "../actions/user-details/user-details-action-creators";
import {dataService, IDataService} from "./data.service";

export const ServicesCreator = {
  createServices: function (apiRequestConfig: object) {
    const dataServiceInstance: IDataService = dataService(apiRequestConfig);
    return {
      actionServices: {
        app: appActionCreators(),
        posts: postsActionCreators({dataService: dataServiceInstance}),
        userDetails: userDetailsActionCreators({dataService: dataServiceInstance})
      },
      dataService: dataServiceInstance
    }
  }
};
