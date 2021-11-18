import {AppDispatch,AppThunk,RootState} from 'app/store';
import {arrangedSubscribedTags} from 'slices/tagSlice';
const doArrangeTag =  ():AppThunk => async (dispatch:AppDispatch,getState: ()=>RootState) => {
  const state = getState();
  const {subscribedIds,loadedTags,newCounts} = state.tags;
  const sIds = [...subscribedIds];
  sIds.sort((id1:string,id2:string)=>{
    const tag1 = loadedTags[id1];
    const tag2 = loadedTags[id2];
    const count1 = newCounts[tag1.name] || 0;
    const count2 = newCounts[tag2.name] || 0;
    if(tag1.lastUpdated && tag2.lastUpdated){
      return (tag1.lastUpdated>tag2.lastUpdated)?-1:1;
    }
    else if(count1!==count2){
      return (count1>count2)?-1:1; 
    }
    else{
      return tag1.lastUpdated?(
        tag2.lastUpdated?(
          (tag1.lastUpdated>tag2.lastUpdated)?-1:1
        ):-1
      ):1
    }
  });
  dispatch(arrangedSubscribedTags(sIds));
};

export default doArrangeTag;
