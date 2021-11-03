import {AppDispatch,AppThunk,RootState} from 'app/store';
import {retrievedSubscribedTagList} from 'features/tagwatch/tagSlice';
import tagService from 'services/tag.service';

export default (): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const response = await tagService.me();
  dispatch(retrievedSubscribedTagList(response.data.results));
};

