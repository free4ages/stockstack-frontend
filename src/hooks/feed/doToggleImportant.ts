import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedImportant,markedUnImportant} from 'slices/feedSlice';
import feedService from 'services/feed.service';

export default (feedId:string,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await feedService.list(filters);
  if(value){
    dispatch(markedImportant(feedId));
  }
  else{
    dispatch(markedUnImportant(feedId));
  }
  await feedService.markImportant({userFeedId:feedId,value});
};



