import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedImportant,markedUnImportant} from 'slices/articleSlice';
import articleService from 'services/article.service';
import {IArticleDocument} from 'services/article.service';

const doToggleImportant = (article:IArticleDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await articleService.list(filters);
  if(value){
    dispatch(markedImportant({articleId:article.id}));
  }
  else{
    dispatch(markedUnImportant({articleId:article.id}));
  }
  await articleService.markImportant({articleId:article.id,value});
};
export default doToggleImportant;


