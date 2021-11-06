import axios,{AxiosInstance} from 'axios';
import {storageGet} from 'utils/storage';
const instance:AxiosInstance = axios.create();

instance.interceptors.request.use(
  config => {
    const token = storageGet("token","session");
    config.headers = config.headers || {};
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  successRes => successRes,
  ({ response }) => {
    //console.log('error : response -> ', response);
    //if (response?.status === 401) {
    //  localStorage.removeItem('token');

    //  if (!response?.url || !response?.url.includes('auth/local')) {
    //    window.location.reload();
    //  }
    //}
    return Promise.reject(response);
  }
);
export const client = instance;
