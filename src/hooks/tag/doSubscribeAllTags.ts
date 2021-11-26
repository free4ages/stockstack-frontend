import {AppDispatch,AppThunk,RootState} from 'app/store';
import socketClient from 'app/socketClient';
import doFetchFeedTagCount from './doFetchFeedTagCount';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';


const doSubscribeAllTags = (): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to subscribe topics"}))
    return;
  }

  const data = await socketClient.request<{status:string}>('tag:subscribeall',{});
  console.log(data);
  dispatch(doFetchFeedTagCount());
}

export default doSubscribeAllTags;

