import {AppDispatch,AppThunk,RootState} from 'app/store';
import socketClient from 'app/socketClient';

const doSubscribeNewArticle = (subscribe:boolean=true):AppThunk => async (dispatch:AppDispatch,getState:()=>RootState) => {
  if(subscribe){
    await socketClient.request('article:subscribe',{});
  }
  else{
    await socketClient.request('article:unsubscribe',{});
  }
};

export default doSubscribeNewArticle;
