import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedRead,markedUnRead} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {IFeedDocument} from 'services/feed.service';

export default (feed:IFeedDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await feedService.list(filters);
  if(value){
    dispatch(markedRead({feedId:feed.id}));
  }
  else{
    dispatch(markedUnRead({feedId:feed.id}));
  }
  await feedService.markRead({userFeedId:feed.id,value});
};


