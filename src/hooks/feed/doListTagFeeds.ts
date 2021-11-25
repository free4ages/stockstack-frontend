import {AppDispatch,AppThunk,RootState} from 'app/store';
import {history} from 'app/history';
import {IFeedFilter} from 'slices/feedSlice';
import doListFeeds from './doListFeeds';
import getActivePage from 'app/getActivePage';
import {changedFilter} from 'slices/feedSlice';

const doListTagFeeds = (tagName:string): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const addFilter:IFeedFilter = {};
  addFilter.tagName = tagName;
  addFilter.showImportant = null;
  addFilter.showReadLater = null;
  addFilter.q = null;
  if(getActivePage()==='feeds'){
    dispatch(doListFeeds({addFilter}));
  }
  else{
    dispatch(changedFilter(addFilter));
    history.push('/feeds');
  }
};

export default doListTagFeeds;

