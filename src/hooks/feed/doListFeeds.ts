import {AppDispatch,AppThunk,RootState} from 'app/store';
import {retrievedFeedList} from 'slices/feedSlice';
import feedService from 'services/feed.service';

export default (filters:any): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const response = await feedService.list(filters);
  dispatch(retrievedFeedList(response.data.results));
};

