import {AppDispatch,AppThunk,RootState} from 'app/store';
import {IAlert} from 'slices/authSlice';
import {showAlert} from 'slices/authSlice';

export const checkLogin = (state:RootState)=>{
  return !!state.auth.user;
}
const doShowAuthAlert =  (info:IAlert): AppThunk => (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!checkLogin(getState())){
    dispatch(showAlert(info));
  }
};

export default doShowAuthAlert;

