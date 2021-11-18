import {AppDispatch,AppThunk,RootState} from 'app/store';
import {IFeedFilter} from 'slices/feedSlice';
import doListFeeds from './doListFeeds';

interface IParams{
  query: string;
  all ?: boolean;
}
const doSearchFeeds = (params:IParams): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const {query,all=false} = params;
  const addFilter:IFeedFilter = {};
  if(all){
    addFilter.tagName = null;
    addFilter.showImportant = null;
    addFilter.hideRead = null;
    addFilter.showReadLater = null;
  }
  addFilter.q = query;
  dispatch(doListFeeds({addFilter}));
};

export default doSearchFeeds;
