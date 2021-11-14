import {AppDispatch,AppThunk,RootState} from 'app/store';
import {ITagCount} from 'slices/tagSlice';
import {retrievedFeedTagCounts} from 'slices/tagSlice';
import doArrangeTag from './doArrangeTag';

export default (data:ITagCount[]):AppThunk => (dispatch:AppDispatch) =>{
  dispatch(retrievedFeedTagCounts(data));
  dispatch(doArrangeTag());
}
