import {AppDispatch,AppThunk,RootState} from 'app/store';
import {retrievedFeedList} from 'slices/feedSlice';
import feedService from 'services/feed.service';
import {IFeedListParams} from 'services/feed.service';
import {IFeedFilter} from 'slices/feedSlice';

const tranformFilters = (filters:IFeedFilter): IFeedListParams => {
  const transformed:any = {};
  for(let [key,value] of Object.entries(filters)){
    if(key==="showImportant"){
      if(value) transformed["important"] = true;
    }
    else if(key==="showReadLater"){
      if(value) transformed["readLater"] = true;
    }
    else if(key==="hideRead"){
      if(value) transformed["isRead"] = false;
    }
    else if(key==="tagName"){
      if(value) transformed["tagNames"] = value;
    }
    else{
      transformed[key]=value;
    }
  }
  return transformed;
}
export default (filters:any): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const response = await feedService.list(tranformFilters(filters));
  dispatch(retrievedFeedList(response.data.results));
};

