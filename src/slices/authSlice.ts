import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ILoginParams} from 'services/auth.service';

import {storageSet,storageRemove,storageGet} from 'utils/storage';
export interface IUser{
  email: string;
  name?: string;
}
export interface AuthState{
  loading: boolean;
  error: any;
  token: string | null;
  user: IUser | null;
}

const userJson = storageGet("user","session");
let user=null,token=null;
console.log(userJson);
if(userJson){
  try{
    user = JSON.parse(userJson);
    console.log('user',user)
    if(!user.email){
      throw '';
    }
    token = storageGet("token","session");
  }catch(err){
    storageRemove("token","session");
    storageRemove("user","session");
    token = null;
    user=null;
  }
}
const initialState:AuthState = {
  token: token,
  user: user,
  loading:false,
  error: null,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestSent: (state) => ({...state,loading:true}),
    loginFailed: (state) => {
      return {...state,token:null,user:null,loading:false};
    },
    tokenAcquired: (state,action:PayloadAction<any>) => {
      const token = action.payload.tokens.access.token;
      const userData = action.payload.user;
      const user = {name:userData.name,email:userData.email};
      storageSet("token", token, "session");
      storageSet("user", JSON.stringify(user), "session");
      return { ...state, token ,user,loading:false};
    },
    doLogout: (state) => {
      storageRemove("token","session");
      storageRemove("user","session");
      return { ...state,token:null,user:null };
    },
    authError: (state,action:PayloadAction<any>) => {
    }
  }
});

export const {loginFailed,tokenAcquired,doLogout,authError,requestSent} = authSlice.actions;

export default authSlice.reducer;
