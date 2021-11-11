import {AppDispatch,AppThunk,RootState} from 'app/store';
import {subscribedTag,unSubscribedTag} from 'slices/tagSlice';
import tagService from 'services/tag.service';
import {ITagDocument} from 'services/tag.service';

const doSubscribe = ({tag,value}:{tag:ITagDocument,value:boolean}): AppThunk => async (dispatch:AppDispatch) => {
  if(value){
    dispatch(subscribedTag(tag));
    await tagService.subscribe(tag.id);
  }
  else{
    dispatch(unSubscribedTag(tag));
    await tagService.unsubscribe(tag.id);
  }
}

export default doSubscribe;

