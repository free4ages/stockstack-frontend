import BackendAPI from "./backend";
import { IUserDocument } from "./user.service";
import {GrantResources as GResources} from "./auth.service";
//import NotificationService from './notificationService';

interface ILoginParms {
  email: string;
  password: string;
}

export enum UserRole {
  USER = "user",
  //EDUCATOR = "educator",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
  //CONTRIBUTOR = "contributor"
}
const GrantResources = GResources;

//const token = localStorage.getItem('token');

//if (token) {
//  BackendAPI.setToken(token);
//}
//let currentUser: IUserDocument | null = null;
let currentUser: IUserDocument | null = {
  username:"rohit.anand",
  email:"rohitanand.iitkgp@gmail.com",
  name:"Rohit Anand",
  role:UserRole.SUPERADMIN,
  _id:"ansnfdgh574895734",
  permissions:[],
  createdAt:"",
  updatedAt:"",
  __v:"0",
};
let evaluatedPermissions: any = {};

const isLoggedIn = () => {
  if (currentUser) {
    return true;
  }
  return true;

  const status = localStorage.getItem('token') !== null;
  if (status) {
    AuthAPI.isAuthenticated = true;
  }
  return status;
};

const setCurrentUser = () => {
  return BackendAPI.user.me()
    .then((response: any) => {
      // @ts-ignore
      currentUser = response.data;
      const permissions = response.data.permissions || [];
      evaluatedPermissions = permissions.reduce((acc: any, it: any) => {
        const perm = GrantResources[it];
        if (perm) {
          acc[perm] = perm;
        }
        return acc;
      }, {});
      return currentUser;
    })
};

const getUserGrants = () => {
  return evaluatedPermissions;
};

const hasResourceGrant = (resource: string) => {
  console.log(resource);
//  if (currentUser && currentUser.role === UserRole.SUPERADMIN) {
//    return true;
//  }
//
//  const grant = evaluatedPermissions[resource];
//  return Boolean(grant);
  return true;
};

const getCurrentUser = () => {
  return currentUser;
};

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status
  }
}

const login = ({ email, password }: ILoginParms) => {
  return BackendAPI.auth.login({ email, password })
    .then((response:any) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      AuthAPI.isAuthenticated = true;
      return setCurrentUser();
    }, ( response:any ) => {
      console.log(response)
      if (response.status === 401) {
        throw new HttpError(response.status, (response.data && response.data.message) || "Invalid Username or Password.");
      } else {
        throw new HttpError(response.status, (response.data && response.data.message) || "Internal Server Error.");
      }

    });
};

const logout = () => {
  localStorage.removeItem('token');
  currentUser = null;
};

const getRedirectUrl = (user: IUserDocument | null) => {
  let url = '/login';

  if (user) {
//    switch (user.role) {
//      case UserRole.USER:
//        url = '/course/wall';
//        break;
//      case UserRole.ADMIN:
//      case UserRole.SUPERADMIN:
//        url = '/dashboard';
//        break;
//      case UserRole.EDUCATOR:
//        url = '/dashboard';
//        break;
//      case UserRole.CONTRIBUTOR:
//        url = '/dashboard';
//        break;
//      default:
//        url = '/login';
//    }
  }

  return url;
};

const getCacheUserMe = ()=>{
  console.log('user.me api called, data returned from cache')
  return new Promise((resolve) => {
      const user = getCurrentUser();
      resolve({data: user});
  });
}



const AuthAPI = {
  login,
  logout,
  isLoggedIn,
  setCurrentUser,
  isAuthenticated: false,
  getCurrentUser,
  getRedirectUrl,
  getUserGrants,
  hasResourceGrant,
  getCacheUserMe
};

export default AuthAPI;
