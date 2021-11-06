import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedRead,markedUnRead} from 'slices/feedSlice';
import feedService from 'services/feed.service';

export default (feedId:string,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await feedService.list(filters);
  if(value){
    dispatch(markedRead(feedId));
  }
  else{
    dispatch(markedUnRead(feedId));
  }
  await feedService.markRead({userFeedId:feedId,value});
};


