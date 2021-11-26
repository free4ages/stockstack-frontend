import {AppDispatch,AppThunk,RootState} from 'app/store';
import articleService from 'services/article.service';
import {IArticleListParams,IArticleDocument} from 'services/article.service';
import {IArticleFilter} from 'slices/articleSlice';
import doListArticlesUserInfo from './doListArticlesUserInfo';
import {transformFilters} from './utils';
import {
  retrievedArticleList,
  requestedArticleList,
  requestedMoreArticleList,
  retrievedMoreArticleList,
} from 'slices/articleSlice';

interface IOptions {
  loadMore?:boolean;
  addFilter ?: IArticleFilter | null;
};

const doListArticles = (options:IOptions={}): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const state = getState();
  const filters = {...state.articles.filters};
  const {loadMore=false,addFilter=null} = options;
  if(loadMore && addFilter){
    throw new Error("You cannot do loadmore and filter change simultaneously");
  }
  if(addFilter){
    Object.assign(filters,addFilter);
  }
  const transformedFilter = transformFilters(filters);
  if(loadMore){
    dispatch(requestedMoreArticleList(transformedFilter));
    transformedFilter.page = (state.articles.currentPage || 1)+1;
  }
  else{
    transformedFilter.page = 1;
    dispatch(requestedArticleList(transformedFilter))
  }

  //get the updated state here aftre requested filter set
  const requestedFilter = getState().articles.requestedFilter;

  transformedFilter.limit = state.articles.pageSize;
  transformedFilter.paginate = false;
  const response = await articleService.list(transformedFilter);
  if(loadMore){
    dispatch(retrievedMoreArticleList({...response.data,requestedFilter}));
  }
  else{
    dispatch(retrievedArticleList({...response.data,requestedFilter,updatedFilter:filters}));
  }
  const results = response.data.results;
  if(state.auth.user){
    const articleIds = results.map((article:IArticleDocument)=>article.id);
    dispatch(doListArticlesUserInfo(articleIds));
  }
};

export default doListArticles;
