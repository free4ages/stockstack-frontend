import {AppDispatch,AppThunk,RootState} from 'app/store';
import {IFeedFilter} from 'slices/feedSlice';
import {retrievedPinnedFeedList,requestedPinnedFeedList} from 'slices/feedSlice';
import feedService,{IFeedListParams} from 'services/feed.service';

const doListPinnedFeeds = (tagName:string|undefined|null): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const filters:IFeedListParams = {
    paginate:false,
    limit:10,
    sortBy:'default'
  };
  if(tagName) filters.pinTags = tagName;
  dispatch(requestedPinnedFeedList());
  const response = await feedService.list(filters);
  dispatch(retrievedPinnedFeedList({...response.data,requestedTagName:tagName || ""}));
}

export default doListPinnedFeeds;
