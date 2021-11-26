import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {storageSet,storageRemove,storageGet} from 'utils/storage';

const STORAGE_TYPE = "session";
export interface IUser{
  email: string;
  name?: string;
}
type Severity = "error" | "success" | "info" | "warning" | undefined;
export interface IAlert{
  message: string;
  type?: Severity;
}
export interface AuthState{
  modalOpen: boolean,
  loading: boolean;
  error: any;
  token: string | null;
  user: IUser | null;
  authAlert: IAlert | null;
}

const userJson = storageGet("user",STORAGE_TYPE);
let user=null,token=null;
if(userJson){
  try{
    user = JSON.parse(userJson);
    if(!user.email){
      throw new Error('Invalid User Json');
    }
    token = storageGet("token",STORAGE_TYPE);
  }catch(err){
    storageRemove("token",STORAGE_TYPE);
    storageRemove("user",STORAGE_TYPE);
    token = null;
    user=null;
  }
}
const initialState:AuthState = {
  token: token,
  user: user,
  loading:false,
  error: null,
  modalOpen:false,
  authAlert: null,
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
      storageSet("token", token, STORAGE_TYPE);
      storageSet("user", JSON.stringify(user), STORAGE_TYPE);
      return { ...state, token ,user,loading:false};
    },
    logout: (state) => {
      storageRemove("token",STORAGE_TYPE);
      storageRemove("user",STORAGE_TYPE);
      return { ...state,token:null,user:null };
    },
    authError: (state,action:PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleModal: (state,action:PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    resetAlert:(state) => {
      state.authAlert = null;
    },
    showAlert:(state,action:PayloadAction<IAlert>) => {
      state.authAlert = action.payload;
    }
  }
});

export const {
  loginFailed,
  tokenAcquired,
  logout,
  authError,
  requestSent,
  toggleModal,
  showAlert,
  resetAlert,
} = authSlice.actions;

export default authSlice.reducer;
