import {AppDispatch,AppThunk,RootState} from 'app/store';
import {history} from 'app/history';
import {IArticleFilter} from 'slices/articleSlice';
import doListArticles from './doListArticles';
import {changedFilter} from 'slices/articleSlice';
import getActivePage from 'app/getActivePage';

const doListTagArticles = (tagName:string): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const addFilter:IArticleFilter = {};
  addFilter.tagName = tagName;
  addFilter.q = null;
  if(getActivePage()==="articles"){
    dispatch(doListArticles({addFilter}));
  }
  else{
    dispatch(changedFilter(addFilter));
    history.push('/articles');
  }
};

export default doListTagArticles;


