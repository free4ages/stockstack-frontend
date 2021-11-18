import { client } from './client';
import { IDocument } from './types';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IGoogleLogin {
  token: string;
  googleId: string;
}

export interface IPermission extends IDocument {
  label: string;
  value: string;
}

export enum GrantResources {
}

export interface IGrantPermissions extends Array<IPermission> {}

const login = (params: ILoginParams) => {
  return client.post('/auth/login', params)//.then((response:any) => {
//    if(response?.data?.token){
//      client.defaults.headers["Authorization"] = `Bearer ${response?.data?.token}`;
//    }

//    return response;
//  });
};

//const googleLogin = (params: IGoogleLogin) => {
//  return client.post('/auth/local/login/google', params).then((response:any) => {
//    client.defaults.headers.authorization = `Bearer ${response.data.token}`;
//
//    return response;
//  });
//};

const grantPermissions = () => {
  return client.get('/auth/permissions');
};

const authService =  { 
  login, 
  //googleLogin, 
  grantPermissions, 
  GrantResources 
};

export default authService;
