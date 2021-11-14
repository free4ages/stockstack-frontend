import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedReadLater,removedReadLater} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {IFeedDocument} from 'services/feed.service';

export default (feed:IFeedDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await feedService.list(filters);
  if(value){
    dispatch(markedReadLater({feedId:feed.id}));
  }
  else{
    dispatch(removedReadLater({feedId:feed.id}));
  }
  await feedService.markReadLater({userFeedId:feed.id,value});
};




