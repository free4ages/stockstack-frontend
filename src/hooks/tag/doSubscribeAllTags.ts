import {AppDispatch,AppThunk,RootState} from 'app/store';
import socketClient from 'app/socketClient';
import doFetchFeedTagCount from './doFetchFeedTagCount';


const doSubscribeAllTags = (): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const data = await socketClient.request<{status:string}>('tag:subscribeall',{});
  console.log(data);
  dispatch(doFetchFeedTagCount());
}

export default doSubscribeAllTags;

