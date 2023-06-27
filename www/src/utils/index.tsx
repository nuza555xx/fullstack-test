import axios, { AxiosRequestConfig } from "axios";

export function requestAPI<T>(configs: AxiosRequestConfig) {
  const headers = { "API-KEY": "API-KEY" };

  return axios
    .request<T>({ ...configs, headers: { ...configs.headers, ...headers } })
    .then((response) => response.data);
}
