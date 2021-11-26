import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedSeen} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {IFeedDocument} from 'services/feed.service';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

let _queue:string[] = []; 
let timeout:any = null;

const makeRequest = ()=>{
  if(!_queue.length) return;
  const ids = _queue;
  _queue = [];
  feedService.markSeen({userFeedIds:ids,value:true}).then((response)=>console.log(response));
};
const addToQueue=(feedId:string)=>{
  if(_queue.indexOf(feedId)===-1){
    _queue.push(feedId);
  }
};
const scheduleMarkSeen = (feedId:string)=>{
  addToQueue(feedId);
  if(!timeout){
    timeout = setTimeout(()=>{
      makeRequest();
      clearTimeout(timeout);
      timeout = null;
    },1000);
  }
};

const doMarkSeenAuto = (feedId:string): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to mark read"}))
    return;
  }

  const state = getState();
  const feed = state.feeds.loadedFeeds[feedId];
  dispatch(markedSeen({feedId:feedId}))
  scheduleMarkSeen(feedId);
}

export default doMarkSeenAuto;

