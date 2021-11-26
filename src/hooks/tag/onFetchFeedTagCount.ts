import {AppDispatch,AppThunk} from 'app/store';
import {ITagCount} from 'slices/tagSlice';
import {retrievedFeedTagCounts} from 'slices/tagSlice';
import doArrangeTag from './doArrangeTag';

const onFetchFeedTagCount = (data:ITagCount[]):AppThunk => (dispatch:AppDispatch) =>{
  dispatch(retrievedFeedTagCounts(data));
  dispatch(doArrangeTag());
};

export default onFetchFeedTagCount;
