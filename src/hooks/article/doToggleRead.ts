import {AppDispatch,AppThunk,RootState} from 'app/store';
import articleService from 'services/article.service';
import {IArticleDocument} from 'services/article.service';
import {markedRead,markedUnRead} from 'slices/articleSlice';
import {updateNewCount} from 'slices/tagSlice';
import {doShowAuthAlert,checkLogin} from 'hooks/auth';

const doToggleRead = (article:IArticleDocument,value:boolean): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(!checkLogin(getState())){
    dispatch(doShowAuthAlert({message:"Please login to mark read."}))
    return;
  }
  //const response = await articleService.list(filters);
  if(value){
    dispatch(markedRead({articleId:article.id}));
  }
  else{
    dispatch(markedUnRead({articleId:article.id}));
  }
  const response:any = await articleService.markRead({articleId:article.id,value});
  if(response.data.modified && article.tags && article.tags.length){
    const delta = value?-1:1;
    //if marked unread or marked read and not newly inserted
    if(!value || (value && !response.data.added)){
      const countUpdates = article.tags.map(tag=>({tagName:tag,delta}));
      dispatch(updateNewCount(countUpdates));
    }
  }
};

export default doToggleRead;
