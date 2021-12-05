import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedPin,markedUnPin} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {IFeedDocument} from 'services/feed.service';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

const doTogglePin =  (feed:IFeedDocument,tagNames:string[],value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!tagNames || !tagNames.length) return;
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to pin"}))
    return;
  }
  //const response = await feedService.list(filters);
  if(value){
    dispatch(markedPin({feedId:feed.id,tagNames}));
  }
  else{
    dispatch(markedUnPin({feedId:feed.id,tagNames}));
  }
  await feedService.markPinned({userFeedId:feed.id,tagNames,value});
};
export default doTogglePin;



