import {AppDispatch,AppThunk,RootState} from 'app/store';
import {ILoginParams} from 'services/auth.service';
import authService from 'services/auth.service';
import {history} from 'app/history';

import {requestSent,loginFailed,authError,tokenAcquired} from 'slices/authSlice';

export default (params:ILoginParams): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(requestSent());
  //dispatch(attemptLogin(params));
  try{
    const response = await authService.login(params)
    //dispatch(responseReceived());
    dispatch(tokenAcquired(response.data));
    history.push('/');
  }catch(err:any){
     dispatch(loginFailed());
     dispatch(authError(err || 'An Error Occured'));
  };
};

