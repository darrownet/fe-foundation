import {appActionCreators} from "../actions/app/app-action-creators";
import {postsActionCreators} from "../actions/posts/posts-action-creators";
import {postDetailsActionCreators} from "../actions/user-details/post-details-action-creators";
import {dataService, IDataService} from "./data.service";

export const ServicesCreator = {
  createServices: function (apiRequestConfig: object) {
    const dataServiceInstance: IDataService = dataService(apiRequestConfig);
    return {
      actionServices: {
        app: appActionCreators(),
        posts: postsActionCreators({dataService: dataServiceInstance}),
        userDetails: postDetailsActionCreators({dataService: dataServiceInstance})
      },
      dataService: dataServiceInstance
    }
  }
};
