import {AppDispatch,AppThunk,RootState} from 'app/store';
import {retrievedSubscribedTagList} from 'slices/tagSlice';
import tagService from 'services/tag.service';
import doArrangeTag from './doArrangeTag';

export default (): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const response = await tagService.me();
  dispatch(retrievedSubscribedTagList(response.data.results));
  dispatch(doArrangeTag());
};

