import {AppDispatch,AppThunk,RootState} from 'app/store';
import {IFeedFilter} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {
  retrievedFeedList,
  requestedMoreFeedList,
  requestedFeedList,
  retrievedMoreFeedList
} from 'slices/feedSlice';
import doListPinnedFeeds from './doListPinnedFeeds';
import {transformFilters} from './utils';



interface IOptions {
  loadMore?:boolean;
  addFilter ?: IFeedFilter | null;
  fetchPinned ?: boolean;
};
const doListFeeds = (options:IOptions={}): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const state = getState();
  const filters = {...state.feeds.filters};
  const {loadMore=false,addFilter=null,fetchPinned=true} = options;
  if(loadMore && addFilter){
    throw new Error("You cannot do loadmore and filter change simultaneously");
  }
  if(addFilter){
    Object.assign(filters,addFilter);
  }
  const transformedFilter = transformFilters(filters);
  if(loadMore){
    dispatch(requestedMoreFeedList(transformedFilter));
    transformedFilter.page = (state.feeds.currentPage || 1)+1;
  }
  else{
    transformedFilter.page = 1;
    dispatch(requestedFeedList(transformedFilter))
  }

  //get the updated state here aftre requested filter set
  const requestedFilter = getState().feeds.requestedFilter;

  transformedFilter.limit = state.feeds.pageSize;
  transformedFilter.paginate = false;
  const response = await feedService.list(transformedFilter);
  console.log(fetchPinned,filters.tagName);
  if(fetchPinned && filters.tagName){
    dispatch(doListPinnedFeeds(filters.tagName));
  }
  if(loadMore){
    dispatch(retrievedMoreFeedList({...response.data,requestedFilter}));
  }
  else{
    dispatch(retrievedFeedList({...response.data,requestedFilter,updatedFilter:filters}));
  }
};
export default doListFeeds;
