import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedReadLater,removedReadLater} from 'slices/feedSlice';
import feedService from 'services/feed.service';

export default (feedId:string,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await feedService.list(filters);
  if(value){
    dispatch(markedReadLater(feedId));
  }
  else{
    dispatch(removedReadLater(feedId));
  }
  await feedService.markReadLater({userFeedId:feedId,value});
};




