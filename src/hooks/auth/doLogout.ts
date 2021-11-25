import {AppDispatch,AppThunk,RootState} from 'app/store';

import {logout} from 'slices/authSlice';
import socketClient from 'app/socketClient';

const doLogout = (): AppThunk => async (dispatch: AppDispatch) => {
  await socketClient.disconnect();
  dispatch(logout());
};

export default doLogout;


