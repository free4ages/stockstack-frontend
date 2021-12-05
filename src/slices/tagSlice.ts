import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import {ITagDocument} from 'services/tag.service';


export interface ITagState{
  subscribedIds: string[];
  pinnedIds: string[];
  searchResults: ITagDocument[];
  loadedTags: {[key: string]: ITagDocument};
  filters : any;
  newCounts: {[key:string]:number};
}
export interface ITagCount{
  name: string;
  count: number;
  latestDate: string;
}

const initialState: ITagState = {
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
    },
    retrievedFeedTagCounts: (state,action:PayloadAction<ITagCount[]>) => {
      const data = action.payload; 
      const counts:{[key:string]:number}={};
      const lastUpdates:{[key:string]:string} ={};
      data.forEach((c) => {
        counts[c.name] = c.count;
        lastUpdates[c.name] = c.latestDate;
      });
      state.newCounts = counts;
      let tag;
      for(let key in state.loadedTags){
        tag = state.loadedTags[key]; 
        if(tag && lastUpdates[tag.name] && lastUpdates[tag.name]!==tag.lastUpdated){
          state.loadedTags[key]={...tag,lastUpdated:lastUpdates[tag.name]};
        }
      }
    },
    arrangedSubscribedTags: (state,action:PayloadAction<string[]>) => {
      state.subscribedIds = action.payload;
    },
    updateNewCount: (state,action:PayloadAction<{tagName:string,delta:number}[]>) => {
      action.payload.forEach(({tagName,delta})=>{;
        if(!state.newCounts[tagName]){
          state.newCounts[tagName] = 0;
        }
        const newCount = state.newCounts[tagName]+delta;
        state.newCounts[tagName] = (newCount>=0)?newCount:0;
      });
    },
    updateLastUpdated: (state,action:PayloadAction<{tagId:string}>) => {
      const {tagId} = action.payload;
      if(state.loadedTags[tagId]){
        state.loadedTags[tagId] = {...state.loadedTags[tagId],lastUpdated:new Date().toISOString()}
      }
    }
  }
});

export const {
  retrievedSubscribedTagList,
  subscribedTag,
  unSubscribedTag,
  retrievedFeedTagCounts,
  arrangedSubscribedTags,
  updateNewCount,
  updateLastUpdated,
} = tagSlice.actions;

export default tagSlice.reducer;

