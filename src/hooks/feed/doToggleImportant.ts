import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedImportant,markedUnImportant} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {IFeedDocument} from 'services/feed.service';

const doToggleImportant =  (feed:IFeedDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await feedService.list(filters);
  if(value){
    dispatch(markedImportant({feedId:feed.id}));
  }
  else{
    dispatch(markedUnImportant({feedId:feed.id}));
  }
  await feedService.markImportant({userFeedId:feed.id,value});
};
export default doToggleImportant;


