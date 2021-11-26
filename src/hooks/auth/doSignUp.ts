import {AppDispatch,AppThunk} from 'app/store';
import {IRegisterParams} from 'services/auth.service';
import authService from 'services/auth.service';

import {
  requestSent,
  //loginFailed,
  authError,
  tokenAcquired,
  toggleModal,
} from 'slices/authSlice';

const doSignUp =  (params:IRegisterParams): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(requestSent());
  //dispatch(attemptLogin(params));
  try{
    const response = await authService.register(params)
    //dispatch(responseReceived());
    dispatch(tokenAcquired(response.data));
    dispatch(toggleModal(false));
  }catch(err:any){
     dispatch(authError(err.data.message || 'An Error Occured'));
  };
};

export default doSignUp;
