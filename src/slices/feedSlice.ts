import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk,RootState } from 'app/store'

import {IFeedDocument} from 'services/feed.service';


export interface IFeedFilter{
  showImportant : true | null;
  showUnread: true | null;
  showReadLater: true | null;
  tag: string | null;
  sortBy: 'pubDate:desc' | 'retrieveDate:desc'
}
export interface FeedState{
  feedIds: string[];
  loadedFeeds: {[key: string]: IFeedDocument};
  filters : IFeedFilter;
}


const initialState: FeedState = {
  feedIds: [],
  loadedFeeds: {},
  filters: {
    showImportant: null,
    showUnread: null,
    showReadLater: null,
    tag: null,
    sortBy: 'retrieveDate:desc'
  }
};


const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers:{
    retrievedFeedList: (state,action:PayloadAction<IFeedDocument[]>)=>{
      const feeds = action.payload;
      const feedIds = feeds.map(feed=>feed.id);
      const feedMap:{[key:string]:IFeedDocument} = {};
      feeds.forEach(feed=> {
        feedMap[feed.id] = feed;
      });
      state.feedIds = feedIds;
      state.loadedFeeds = feedMap;
    },
    markedRead: (state,action)=>{
      const feedId = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,isRead:true,readLater:false};
      }
    },
    markedUnRead: (state,action)=>{
      const feedId = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,isRead:false};
      }
    },
    markedImportant: (state,action)=>{
      const feedId = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,important:true};
      }
    },
    markedUnImportant: (state,action)=>{
      const feedId = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,important:false};
      }
    },
    markedReadLater: (state,action)=>{
      const feedId = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,isRead:false,readLater:true};
      }
    },
    removedReadLater: (state,action)=>{
      const feedId = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,readLater:false};
      }
    }
  }
})

export const {
  retrievedFeedList,
  markedRead,
  markedUnRead,
  markedImportant,
  markedUnImportant,
  markedReadLater,
  removedReadLater,
} = feedSlice.actions;

export default feedSlice.reducer;
