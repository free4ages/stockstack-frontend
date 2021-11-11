import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk,RootState } from 'app/store'

import {ITagDocument} from 'services/tag.service';


export interface TagState{
  subscribedIds: string[];
  pinnedIds: string[];
  searchResults: ITagDocument[];
  loadedTags: {[key: string]: ITagDocument};
  filters : any;
  newCounts: {[key:string]:number};
}

const initialState: TagState = {
  subscribedIds: [],
  pinnedIds: [],
  searchResults : [],
  loadedTags: {},
  filters: {},
  newCounts: {},
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers:{
    retrievedSubscribedTagList: (state,action:PayloadAction<ITagDocument[]>)=>{
      const tags = action.payload;
      const tagIds = tags.map(tag=>tag.id);
      tags.forEach(tag=> {
        state.loadedTags[tag.id] = state.loadedTags[tag.id] || tag;
      });
      state.subscribedIds = tagIds;
    },
    subscribedTag: (state,action:PayloadAction<ITagDocument>) => {
      const tag = action.payload;
      if(!state.loadedTags[tag.id]){
        state.loadedTags[tag.id] = tag;
      }
      if(state.subscribedIds.indexOf(tag.id)===-1){
        state.subscribedIds = [...state.subscribedIds,tag.id];
      }
    },
    unSubscribedTag: (state,action:PayloadAction<ITagDocument>) => {
      state.subscribedIds = state.subscribedIds.filter((tagId:string) => tagId!==action.payload.id);
    }
  }
});

export const {
  retrievedSubscribedTagList,
  subscribedTag,
  unSubscribedTag,
} = tagSlice.actions;

export default tagSlice.reducer;

