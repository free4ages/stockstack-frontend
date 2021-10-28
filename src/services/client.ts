import axios,{AxiosInstance} from 'axios';
const instance:AxiosInstance = axios.create();

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
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
    console.log('error : response -> ', response);
    if (response?.status === 401) {
      localStorage.removeItem('token');

      if (!response?.url || !response?.url.includes('auth/local')) {
        window.location.reload();
      }
    }
    return Promise.reject(response);
  }
);
export const client = instance;
