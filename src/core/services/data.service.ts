import axios from "axios";

export interface IDataService {
  get: Function
}

export const dataService = (config: any): IDataService => {

  const axiosInstance = axios.create(config);

  return {
    get: (route:string = '', data?:object, config?:object) => {
      return axiosInstance.get(route, config);
    }
  }
}
