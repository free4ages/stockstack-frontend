import {AppDispatch,AppThunk,RootState} from 'app/store';
import socketClient from 'app/socketClient';
import {subscribedTag,unSubscribedTag} from 'slices/tagSlice';
import tagService from 'services/tag.service';
import {ITagDocument} from 'services/tag.service';
import doArrangeTag from './doArrangeTag';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

const doSubscribe = ({tag,value}:{tag:ITagDocument,value:boolean}): AppThunk => async (dispatch:AppDispatch,getState:()=>RootState) => {
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to subscribe topic"}))
    return;
  }

  if(value){
    dispatch(subscribedTag(tag));
    dispatch(doArrangeTag());
    await tagService.subscribe(tag.id);
    await socketClient.request('tag:subscribe',{tagId:tag.id})
  }
  else{
    dispatch(unSubscribedTag(tag));
    dispatch(doArrangeTag());
    await tagService.unsubscribe(tag.id);
    await socketClient.request('tag:unsubscribe',{tagId:tag.id})
  }
}

export default doSubscribe;

