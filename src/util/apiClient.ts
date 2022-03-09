import axios, { AxiosInstance, Method } from "axios";
import { GenericObject } from "./common.types";

class ApiClient {
  axios: AxiosInstance;
  constructor(axiosInst: AxiosInstance) {
    this.axios = axiosInst;
  }

  makeRequest = async (url: string, method: Method | undefined, data = {}) => {
    return await this.axios({
      url,
      method,
      data,
    });
  };

  getRequest = async (url: string) => this.makeRequest(url, "GET");

  postRequest = async (url: string, body: GenericObject) => {
    return await this.makeRequest(url, "POST", body);
  };
}

const axiosInst = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default new ApiClient(axiosInst);
