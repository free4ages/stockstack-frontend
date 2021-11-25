import {AppDispatch,AppThunk,RootState} from 'app/store';
import {ITagCount} from 'slices/tagSlice';
import socketClient from 'app/socketClient';
import {retrievedFeedTagCounts} from 'slices/tagSlice';
import doArrangeTag from './doArrangeTag';


const doFetchFeedTagCount = (): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const data = await socketClient.request<ITagCount[]>('tag:counts',{});
  dispatch(retrievedFeedTagCounts(data));
  dispatch(doArrangeTag());
  return data;
}

export default doFetchFeedTagCount;
