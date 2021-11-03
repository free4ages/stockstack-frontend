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
  }
});

export const {retrievedSubscribedTagList} = tagSlice.actions;

export default tagSlice.reducer;

