import {AppDispatch,AppThunk,RootState} from 'app/store';
import {retrievedArticleList,requestedArticleList} from 'slices/articleSlice';
import articleService from 'services/article.service';
import {IArticleListParams,IArticleDocument} from 'services/article.service';
import {IArticleFilter} from 'slices/articleSlice';
import doListArticlesUserInfo from './doListArticlesUserInfo';

const tranformFilters = (filters:IArticleFilter): IArticleListParams => {
  const transformed:any = {};
  for(let [key,value] of Object.entries(filters)){
    if(key==="hideRead"){}
    else if(key==="tagName"){
      if(value) transformed["tagNames"] = value;
    }
    else if(key==="q"){
      if(value) transformed["q"] = value;
    }
    else if(value!==null){
      transformed[key]=value;
    }
  }
  return transformed;
}
const doListArticles = (filters:any): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const transformedFilter = tranformFilters(filters);
  dispatch(requestedArticleList(transformedFilter));
  const state = getState();
  const requestedFilter = state.articles.requestedFilter;

  const response = await articleService.list(transformedFilter);
  const results = response.data.results;
  dispatch(retrievedArticleList({...response.data,requestedFilter}));
  if(state.auth.user){
    const articleIds = results.map((article:IArticleDocument)=>article.id);
    dispatch(doListArticlesUserInfo(articleIds));
  }
};

export default doListArticles;
