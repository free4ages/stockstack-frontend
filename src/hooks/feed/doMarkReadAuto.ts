import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedRead} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {updateNewCount} from 'slices/tagSlice';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

let _queue:string[] = []; 
let timeout:any = null;

const makeRequest = ()=>{
  if(!_queue.length) return;
  const ids = _queue;
  _queue = [];
  feedService.markRead({userFeedIds:ids,value:true}).then((response)=>{});
};
const addToQueue=(feedId:string)=>{
  if(_queue.indexOf(feedId)===-1){
    _queue.push(feedId);
  }
};
const scheduleMarkRead = (feedId:string)=>{
  addToQueue(feedId);
  if(!timeout){
    timeout = setTimeout(()=>{
      makeRequest();
      clearTimeout(timeout);
      timeout = null;
    },1000);
  }
};

const doMarkReadAuto = (feedId:string): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to mark read"}))
    return;
  }

  const state = getState();
  const feed = state.feeds.loadedFeeds[feedId];
  dispatch(markedRead({feedId:feedId}))
  if(feed && !feed.isRead && feed.tags && feed.tags.length){
    const countUpdates = feed.tags.map(tag=>({tagName:tag,delta:-1}));
    dispatch(updateNewCount(countUpdates));
  }
  scheduleMarkRead(feedId);
}

export default doMarkReadAuto;
