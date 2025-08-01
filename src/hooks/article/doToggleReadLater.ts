import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedReadLater,removedReadLater} from 'slices/articleSlice';
import articleService from 'services/article.service';
import {IArticleDocument} from 'services/article.service';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

const doToggleReadLater = (article:IArticleDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to read later"}))
    return;
  }
  //const response = await articleService.list(filters);
  if(value){
    dispatch(markedReadLater({articleId:article.id}));
  }
  else{
    dispatch(removedReadLater({articleId:article.id}));
  }
  await articleService.markReadLater({articleId:article.id,value});
};

export default doToggleReadLater;


