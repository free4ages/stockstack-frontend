import {AppDispatch,AppThunk,RootState} from 'app/store';
import {IArticleFilter} from 'slices/articleSlice';
import doListArticles from './doListArticles';

interface IParams{
  query: string;
  all ?: boolean;
}
const doSearchArticles = (params:IParams): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const {query,all=false} = params;
  const addFilter:IArticleFilter = {};
  if(all){
    addFilter.tagName = null;
  }
  addFilter.q = query;
  dispatch(doListArticles({addFilter}));
};

export default doSearchArticles;

