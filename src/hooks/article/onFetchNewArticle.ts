import {AppDispatch,AppThunk,RootState} from 'app/store';
import {IArticleDocument} from 'services/article.service';
import getActivePage from 'app/getActivePage';
import {retrievedNewArticle} from 'slices/articleSlice';

const onFetchNewArticle = (article:IArticleDocument):AppThunk => (dispatch:AppDispatch,getState:()=>RootState) =>{
  if(getActivePage()!=="articles") return;
  dispatch(retrievedNewArticle(article));
};

export default onFetchNewArticle;
