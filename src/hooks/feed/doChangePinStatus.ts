import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedPin,markedUnPin} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {IFeedDocument} from 'services/feed.service';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

const doChangePinStatus =  (feed:IFeedDocument,addTagNames:string[]|null,removeTagNames:string[]|null): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!((addTagNames && addTagNames.length) || (removeTagNames && removeTagNames.length))) return;
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to pin"}))
    return;
  }
  //const response = await feedService.list(filters);
  if(addTagNames && addTagNames.length){
    dispatch(markedPin({feedId:feed.id,tagNames:addTagNames}));
  }
  else if(removeTagNames && removeTagNames.length){
    dispatch(markedUnPin({feedId:feed.id,tagNames:removeTagNames}));
  }
  await feedService.markPinned({userFeedId:feed.id,addTagNames:addTagNames || [],removeTagNames:removeTagNames || []});
};
export default doChangePinStatus;



