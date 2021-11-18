import {AppDispatch,AppThunk,RootState} from 'app/store';
import feedService from 'services/feed.service';
import {retrievedArticleInfo,retrievedMoreArticleInfo} from 'slices/articleSlice';
const doListArticlesUserInfo = (articleIds:string[],append:boolean=false): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(articleIds && articleIds.length){
    const response:any = await feedService.listInfo(articleIds)
    if(append){
      dispatch(retrievedMoreArticleInfo(response.data));
    }else{
      dispatch(retrievedArticleInfo(response.data));
    }
  }
};

export default doListArticlesUserInfo;

