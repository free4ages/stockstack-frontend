import {AppDispatch,AppThunk} from 'app/store';
import {ILoginParams} from 'services/auth.service';
import authService from 'services/auth.service';

import {
  requestSent,
  loginFailed,
  authError,
  tokenAcquired,
  toggleModal,
} from 'slices/authSlice';

const doLogin = (params:ILoginParams): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(requestSent());
  //dispatch(attemptLogin(params));
  try{
    const response = await authService.login(params)
    //dispatch(responseReceived());
    dispatch(tokenAcquired(response.data));
    dispatch(toggleModal(false));
  }catch(err:any){
     dispatch(loginFailed());
     dispatch(authError(err.data.message || 'An Error Occured'));
  };
};
export default doLogin;
