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
  requestedFeedList,
  requestedMoreFeedList,
  markedRead,
  markedSeen,
  markedUnRead,
  markedImportant,
  markedUnImportant,
  markedReadLater,
  removedReadLater,
  changedFilter,
  setReadMode,
} = feedSlice.actions;

export default feedSlice.reducer;
