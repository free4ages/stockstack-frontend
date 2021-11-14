import {AppDispatch,AppThunk,RootState} from 'app/store';
import feedService from 'services/feed.service';
import {retrievedArticleInfo} from 'slices/articleSlice';
export default (articleIds:string[]): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  if(articleIds && articleIds.length){
    const response:any = await feedService.listInfo(articleIds)
    dispatch(retrievedArticleInfo(response.data));
  }
};

