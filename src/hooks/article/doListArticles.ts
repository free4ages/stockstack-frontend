import {AppDispatch,AppThunk,RootState} from 'app/store';
import {retrievedArticleList} from 'slices/articleSlice';
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
    else if(value!==null){
      transformed[key]=value;
    }
  }
  return transformed;
}
export default (filters:any): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const response = await articleService.list(tranformFilters(filters));
  const results = response.data.results;
  dispatch(retrievedArticleList(results));
  const state = getState();
  if(state.auth.user){
    const articleIds = results.map((article:IArticleDocument)=>article.id);
    dispatch(doListArticlesUserInfo(articleIds));
  }
};
