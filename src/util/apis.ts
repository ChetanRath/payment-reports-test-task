import apiClient from "./apiClient";
import { GATEWAY_URL, PROJECT_URL, REPORTS_URL } from "./urls";
import { GenericObject } from "./common.types";

export const fetchDetailedData = async (args: GenericObject) => {
  return await apiClient.postRequest(REPORTS_URL, args);
};

export const fetchProj = async () => {
  return await apiClient.getRequest(PROJECT_URL);
};

export const fetchGate = async () => {
  return await apiClient.getRequest(GATEWAY_URL);
};
