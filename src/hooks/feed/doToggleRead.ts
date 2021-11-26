import {AppDispatch,AppThunk,RootState} from 'app/store';
import {IFeedDocument} from 'services/feed.service';
import {markedRead,markedUnRead} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {updateNewCount} from 'slices/tagSlice';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

const doToggleRead = (feed:IFeedDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await feedService.list(filters);
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to mark read."}))
    return;
  }

  if(value){
    dispatch(markedRead({feedId:feed.id}));
  }
  else{
    dispatch(markedUnRead({feedId:feed.id}));
  }
  if(!!feed.isRead!==!!value && feed.tags && feed.tags.length){
    const delta = value?-1:1;
    const countUpdates = feed.tags.map(tag=>({tagName:tag,delta}));
    dispatch(updateNewCount(countUpdates));
  }
  await feedService.markRead({userFeedId:feed.id,value});
};

export default doToggleRead;


