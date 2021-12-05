import {AppDispatch,AppThunk,RootState} from 'app/store';
import onFetchFeedTagUpdate,{ITagUpdate} from '../tag/onFetchFeedTagUpdate'

interface IArticlePinUpdate{
  articleId : string;
  tagName: string;
}

interface IFeedUpdate{
  action: string,
  payload: ITagUpdate | IArticlePinUpdate
}


const onFetchFeedUpdate = (data:IFeedUpdate):AppThunk => (dispatch:AppDispatch, getState:() => RootState) =>{
};

export default onFetchFeedUpdate;


