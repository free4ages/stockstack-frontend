import {AppDispatch,AppThunk,RootState} from 'app/store';
import onFetchFeedTagUpdate,{ITagUpdate} from '../tag/onFetchFeedTagUpdate'

//interface IArticlePinUpdate{
//  articleId : string;
//  tagName: string;
//}

interface IFeedUpdate{
  action: string,
  payload: ITagUpdate
}


const onFetchFeedUpdate = (data:IFeedUpdate):AppThunk => (dispatch:AppDispatch, getState:() => RootState) =>{
  const {action,payload} = data;
  if(action==="TAG_ADDED"){
    dispatch(onFetchFeedTagUpdate(payload));
  }
};

export default onFetchFeedUpdate;


