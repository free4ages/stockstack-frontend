import {AppDispatch,AppThunk,RootState} from 'app/store';
import {markedRead,markedUnRead} from 'slices/articleSlice';
import articleService from 'services/article.service';
import {IArticleDocument} from 'services/article.service';

export default (article:IArticleDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  //const response = await articleService.list(filters);
  const response:any = await articleService.markRead({articleId:article.id,value});
  if(response.data.modified){
    if(value){
      dispatch(markedRead({articleId:article.id}));
    }
    else{
      dispatch(markedUnRead({articleId:article.id}));
    }
  }
};


