import {AppDispatch,AppThunk,RootState} from 'app/store';
import feedService from 'services/feed.service';
import shallowEqual from 'utils/shallowEqual';
import getActivePage from 'app/getActivePage';
import {retrievedNewFeedList} from 'slices/feedSlice';

interface IQueue{
  articleId:string,
  tags:string[]
}
let _queue:IQueue[] = []; 
let timeout:any = null;
let activeFilter:any=null;

const checkFeedActive = () => {
  return !!(getActivePage()==="feeds");
}

const resetIfInvalid = (filters:any) => {
  if(activeFilter){
    if(!shallowEqual(filters,activeFilter)){
      //filter changed ignore all previous
      _queue = [];
      if(timeout){
        clearTimeout(timeout);
        timeout = null;
        activeFilter = null;
      }
    }
  }

}
const makeRequest = (dispatch:AppDispatch,getState:()=>RootState)=>{
  if(!_queue.length) return;
  if(!checkFeedActive()) return;
  const state = getState();
  resetIfInvalid(state.feeds.filters);
  if(!_queue.length) return;

  const valid = _queue.filter((queue,index,self)=>{
    return index===self.findIndex((t)=>(t.articleId===queue.articleId));
  });
  const prevFilter = activeFilter;
  _queue = []
  activeFilter = null;
  const articleIds = valid.map((x)=>x.articleId);
  feedService.listByArticleIds(articleIds).then((response:any)=>{
    const newState = getState();
    console.log(response);
    if(shallowEqual(newState.feeds.filters,prevFilter)){
      dispatch(retrievedNewFeedList(response.data));
    }
  });
};

const addToQueue=(obj:IQueue)=>{
  _queue.push(obj);
};

const scheduleFetchFeed = (articleId:string,tags:string[],getState:()=>RootState,dispatch:AppDispatch) =>{
  const state = getState();
  if(!checkFeedActive() || state.feeds.filters.q) return;
  const filters = state.feeds.filters;
  //reset filter if changed
  resetIfInvalid(filters);

  const activeTag = state.feeds.filters.tagName;
  if(!activeTag || (tags && tags.length && tags.indexOf(activeTag)!==-1)){
    addToQueue({articleId,tags});
    activeFilter = filters;
    if(!timeout){
      timeout = setTimeout(()=>{
        makeRequest(dispatch,getState);
        clearTimeout(timeout);
        timeout=null;
      },2000)
    }
  }
}

const doFetchArticleFeed = (data:IQueue): AppThunk => async (dispatch:AppDispatch, getState: ()=>RootState) => {
  const {articleId,tags} = data;
  scheduleFetchFeed(articleId,tags,getState,dispatch);
};

export default doFetchArticleFeed;

