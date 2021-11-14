import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedReadLater,removedReadLater} from 'slices/articleSlice';
import articleService from 'services/article.service';
import {IArticleDocument} from 'services/article.service';

export default (article:IArticleDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await articleService.list(filters);
  if(value){
    dispatch(markedReadLater({articleId:article.id}));
  }
  else{
    dispatch(removedReadLater({articleId:article.id}));
  }
  await articleService.markReadLater({articleId:article.id,value});
};




