import axios from "axios";
import config from "/src/config";
import { USER, ACCESS_TOKEN, REFRESH_TOKEN } from "/src/constants";
// import { authService } from "/src/services/auth.service.js";
import router from "@/router";

const axiosApi = axios.create({
  baseURL:
    config.env.baseURL !== undefined
      ? config.env.baseURL
      : `http://127.0.0.1:3000/api/v1/`,
});

axiosApi.interceptors.request.use(
  (config) => {
    const access_token = sessionStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(ACCESS_TOKEN);

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
    return resp.data;
  },
  (error) => handleError(error)
);

function handleError(error) {
  if (error?.response?.status === 401) {
    localStorage.removeItem(USER);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    sessionStorage.removeItem(USER);
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(REFRESH_TOKEN);

    // auto logout if response status 401
    // authService.logout();
    router.push("/login");
    // location.reload(true);
  }

  return Promise.reject(error?.response?.data);
  // return Promise.reject(error.message || error.statusText);
}

export default axiosApi;
