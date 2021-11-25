import { client } from './client';
import { IDocument } from './types';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegisterParams {
  name: string;
  email: string;
  password : string;
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
  return client.post('/auth/login', params);
};

const register = (params: IRegisterParams) => {
  return client.post('/auth/register',params);
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
  register,
  //googleLogin, 
  grantPermissions, 
  GrantResources 
};

export default authService;
