import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import {IFeedDocument,IFeedListParams,IFeedListResponse} from 'services/feed.service';

export interface IFeedFilter{
  showImportant ?: boolean | null;
  hideRead ?: boolean | null;
  showReadLater ?: boolean | null;
  q ?: string | null;
  tagName ?: string | null;
  sortBy ?: 'pubDate:desc' | 'retrieveDate:desc' | 'default'
}
export interface IFeedState{
  feedIds: string[];
  loadedFeeds: {[key: string]: IFeedDocument};
  filters : IFeedFilter;
  loading: boolean;
  moreLoading: boolean;
  fullLoading: boolean;
  moreToFetch: boolean;
  requestedFilter: string;
  currentPage ?: number;
  pageSize ?: number;
  readMode : boolean;
  pinnedSize : number;
}

type IFeedListPayload = IFeedListResponse & {requestedFilter:string,updatedFilter?:IFeedFilter}

const initialState: IFeedState = {
  feedIds: [],
  loadedFeeds: {},
  filters: {
    showImportant: null,
    hideRead: false,
    showReadLater: null,
    tagName: null,
    q: null,
    sortBy: 'default',
  },
  loading: false,
  moreLoading: false,
  fullLoading: false,
  moreToFetch: true,
  requestedFilter: "",
  pageSize:10,
  currentPage: 1,
  readMode: false,
  pinnedSize:0,
};


const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers:{
    requestedFeedList: (state,action:PayloadAction<IFeedListParams>) => {
      return {...state,fullLoading:true,loading:true,requestedFilter:JSON.stringify(action.payload)};
    },
    requestedMoreFeedList: (state,action:PayloadAction<IFeedListParams>) => {
      return {...state,moreLoading:true,loading:true,requestedFilter:JSON.stringify(action.payload)};
    },
    requestedPinnedFeedList: (state) => {
      state.pinnedSize = 0;
    },
    retrievedFeedList: (state,action:PayloadAction<IFeedListPayload>)=>{
      const {results:feeds,page=1,requestedFilter,updatedFilter={}} = action.payload;
      if(requestedFilter !== state.requestedFilter){
        return state;
      } 
      const feedIds = feeds.map(feed=>feed.id);
      const feedMap:{[key:string]:IFeedDocument} = {};
      feeds.forEach(feed=> {
        feedMap[feed.id] = feed;
      });
      state.filters={...updatedFilter};
      state.feedIds = feedIds;
      state.loadedFeeds = feedMap;
      state.loading = false;
      state.fullLoading = false;
      state.currentPage = page;
      state.moreToFetch = !!(feedIds.length>=(state.pageSize || initialState.pageSize || 10));
      state.requestedFilter = "";
    },
    retrievedMoreFeedList: (state,action: PayloadAction<IFeedListPayload>)=> {
      const {results:feeds,page,requestedFilter} = action.payload;
      if(requestedFilter !== state.requestedFilter){
        return state;
      } 
      const feedIds = feeds.map(feed=>feed.id);
      feeds.forEach(feed=> {
        state.loadedFeeds[feed.id] = feed;
      });
      const newFeedIds = [...state.feedIds];
      feedIds.forEach(feedId=>{
        if(newFeedIds.indexOf(feedId)===-1){
          newFeedIds.push(feedId);
        }
      });
      state.feedIds = newFeedIds;
      state.loading = false;
      state.moreLoading = false;
      state.currentPage = page || 1;
      state.moreToFetch= !!(feedIds.length>=(state.pageSize || initialState.pageSize || 10));
    },
    retrievedNewFeedList: (state,action: PayloadAction<IFeedListResponse>)=> {
      const {results:feeds} = action.payload;
      let feedIds = feeds.map(feed=>feed.id);
      const existingIds = state.feedIds;
      const pinnedIds = state.feedIds.slice(0,state.pinnedSize);
      const restIds = state.feedIds.slice(state.pinnedSize);
      feeds.forEach(feed=> {
        state.loadedFeeds[feed.id] = feed;
      });
      feedIds = feedIds.filter((fid)=>(existingIds.indexOf(fid)===-1))
      state.feedIds = [...pinnedIds,...feedIds,...restIds];
    },
    retrievedPinnedFeedList: (state,action: PayloadAction<IFeedListResponse & {requestedTagName:string}>) => {
      const {results:feeds,requestedTagName} = action.payload;
      if(state.filters.tagName!==requestedTagName) return
      let feedIds = feeds.map(feed=>feed.id);
      let existingIds = state.feedIds;
      feeds.forEach(feed=> {
        state.loadedFeeds[feed.id] = feed;
      });
      existingIds = existingIds.filter((fid)=>(feedIds.indexOf(fid)===-1))
      state.feedIds = [...feedIds,...existingIds];
    },
    markedRead: (state,action:PayloadAction<{feedId:string,updateReadLater?:boolean}>)=>{
      const {feedId,updateReadLater=false} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,isRead:true,readLater:updateReadLater?false:feed.readLater,isSeen:true};
      }
    },
    markedSeen: (state,action:PayloadAction<{feedId:string}>)=>{
      const {feedId} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,isSeen:true}
      }
    },
    markedUnRead: (state,action:PayloadAction<{feedId:string}>)=>{
      const {feedId} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,isRead:false,isSeen:true};
      }
    },
    markedImportant: (state,action:PayloadAction<{feedId:string}>)=>{
      const {feedId} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,important:true,isSeen:true};
      }
    },
    markedUnImportant: (state,action:PayloadAction<{feedId:string}>)=>{
      const {feedId} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,important:false,isSeen:true};
      }
    },
    markedPin: (state,action:PayloadAction<{feedId:string,tagNames:string[]}>)=>{
      const {feedId,tagNames} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        const pinTags = [...(feed.pinTags || []),...tagNames]
        state.loadedFeeds[feedId] = {...feed,pinTags};
      }
    },
    markedUnPin: (state,action:PayloadAction<{feedId:string,tagNames:string[]}>)=>{
      const {feedId,tagNames} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        const pinTags = (feed.pinTags || []).filter((tagName)=>(tagNames.indexOf(tagName)===-1))
        state.loadedFeeds[feedId] = {...feed,pinTags};
      }
    },
    markedReadLater: (state,action:PayloadAction<{feedId:string,updateRead?:boolean}>)=>{
      const {feedId,updateRead=true} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {
          ...feed,
          isRead:updateRead?false:feed.isRead,
          isSeen:true,
          readLater:true
        };
      }
    },
    removedReadLater: (state,action:PayloadAction<{feedId:string}>)=>{
      const {feedId} = action.payload;
      const feed = state.loadedFeeds[feedId];
      if(feed){
        state.loadedFeeds[feedId] = {...feed,readLater:false,isSeen:true};
      }
    },
    changedFilter: (state,action:PayloadAction<IFeedFilter>) => {
      state.filters = {...state.filters,...action.payload}
    },
    setReadMode: (state, action:PayloadAction<boolean>) => {
      state.readMode = action.payload;
    }
  }
})

export const {
  retrievedFeedList,
  retrievedMoreFeedList,
  retrievedNewFeedList,
  retrievedPinnedFeedList,
  requestedFeedList,
  requestedMoreFeedList,
  requestedPinnedFeedList,
  markedRead,
  markedSeen,
  markedUnRead,
  markedImportant,
  markedUnImportant,
  markedPin,
  markedUnPin,
  markedReadLater,
  removedReadLater,
  changedFilter,
  setReadMode,
} = feedSlice.actions;

export default feedSlice.reducer;
