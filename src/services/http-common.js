import axios from "axios";
import config from "/src/config";
import ACCESS_TOKEN from "/src/constants";
import { authService } from "/src/services/auth.service.js";
const axiosApi = axios.create({
  baseURL:
    config.env.baseURL !== undefined
      ? config.env.baseURL
      : `http://127.0.0.1:3000/api/v1/`,
});

axiosApi.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (resp) => {
    return Promise.resolve(resp.data);
  },
  (error) => {
    handleError(error);
  }
);

function handleError(error) {
  if (error.status === 401) {
    // auto logout if response status 401
    authService.logout();
    location.reload(true);
  }

  return Promise.reject(error.message || error.statusText);
}

export default axiosApi;
