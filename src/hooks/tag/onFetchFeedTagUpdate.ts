import {AppDispatch,AppThunk,RootState} from 'app/store';
import {ITagCount} from 'slices/tagSlice';
import {updateNewCount,updateLastUpdated} from 'slices/tagSlice';
import doArrangeTag from './doArrangeTag';

export interface ITagUpdate{
  articleId: string;
  title:string;
  tagName: string;
  tagId: string;
}

const onFetchFeedTagUpdate = (data:ITagUpdate):AppThunk => (dispatch:AppDispatch, getState:() => RootState) =>{
  const {tagName,tagId} = data;
  dispatch(updateNewCount([{tagName,delta:1}]));
  dispatch(updateLastUpdated({tagId}));
  dispatch(doArrangeTag());
};
export default onFetchFeedTagUpdate;

