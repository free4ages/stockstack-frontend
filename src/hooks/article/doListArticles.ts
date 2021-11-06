import {AppDispatch,AppThunk,RootState} from 'app/store';
import {retrievedArticleList} from 'slices/articleSlice';
import articleService from 'services/article.service';

export default (filters:any): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const response = await articleService.list(filters);
  dispatch(retrievedArticleList(response.data.results));
};
