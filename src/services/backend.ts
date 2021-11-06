import { client } from './client';
import user from './user.service'
import auth from './auth.service'
const BackendAPI = {
  auth,
  user,
//  setToken: (token: string) => {
//    if(token){
//      client.defaults.headers["Authorization"] = `Bearer ${token}`;
//    }
//  },
  setENV: (env: string) => {
    let url;
    switch (env) {
      case 'PROD':
        url = 'http://localhost';
        break;
      default:
        url = 'http://localhost:3000/v1';
        break;
    }
    //EnvironmentService.setEnv(env);
    client.defaults.baseURL = url;
  },
  
};

export default BackendAPI;
