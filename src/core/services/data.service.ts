import axios from "axios";

export interface IDataService {
  get: Function,
  post: Function
}

export const dataService = (config: any): IDataService => {

  const axiosInstance = axios.create(config);

  return {
    get: (route:string = '', config?:object) => {
      return axiosInstance.get(route, config);
    },
    post: (route:string = '', data:object, config?:object) => {
      return axiosInstance.post(route, data, config);
    }
  }
}
