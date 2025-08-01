import {AppDispatch,AppThunk,RootState} from 'app/store';
import feedService from 'services/feed.service';
import {transformFilters} from './utils';
import {doFetchFeedTagCount} from 'hooks/tag';
import doListFeeds from './doListFeeds';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

const doMarkReadAll = (): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to mark read"}))
    return;
  }
  const state = getState();
  const filters = {...state.feeds.filters};
  const transformedFilter = transformFilters(filters);
  //const response = await feedService.list(filters);
  await feedService.markReadBulk(transformedFilter);
  dispatch(doFetchFeedTagCount());
  dispatch(doListFeeds());
};

export default doMarkReadAll;



