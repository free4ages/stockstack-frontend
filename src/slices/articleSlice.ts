import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {IArticleDocument,IArticleListResponse} from 'services/article.service';

export interface IArticleInfo{
  _id: string; //feedId
  article: string;
  readLater ?: boolean;
  notesCount ?: number;
  important ?: boolean;
  isRead ?: boolean;
  deleted ?: boolean;
}

export interface IArticleFilter{
  q ?: string | null;
  tagName ?: string | null;
  sortBy ?: 'pubDate:desc' | 'retrieveDate:desc'
  hideRead ?: boolean | null;
}
export interface IArticleState{
  articleIds: string[],
  loadedArticles: {[key: string]: IArticleDocument};
  filters : IArticleFilter;
  articlesInfo: {[key:string]:IArticleInfo};
  loading: boolean;
  moreLoading: boolean;
  fullLoading: boolean;
  moreToFetch: boolean;
  currentPage: number;
  limit: number;
}

const initialState: IArticleState = {
  articleIds: [],
  articlesInfo: {},
  loadedArticles: {},
  filters: {
    q: null,
    tagName: null,
    sortBy: 'retrieveDate:desc',
    hideRead: false
  },
  loading: false,
  moreLoading: false,
  fullLoading: false,
  moreToFetch: true,
  currentPage: 0,
  limit: 50
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers:{
    requestedArticleList: (state,action) => {
      return {...state,fullLoading:true,loading:true};
    },
    requestedMoreArticleList: (state,action) => {
      return {...state,moreLoading:true,loading:true};
    },
    retrievedArticleList: (state,action:PayloadAction<IArticleListResponse>)=>{
      const {results:articles,page} = action.payload;
      const articleIds = articles.map(article=>article.id);
      const articleMap:{[key:string]:IArticleDocument} = {};
      articles.forEach(article=> {
        articleMap[article.id] = article;
      });
      return {
        ...state,
        articleIds,
        loadedArticles: articleMap,
        loading:false,
        fullLoading:false,
        currentPage:page || 0,
        moreToFetch: !(articleIds.length<state.limit),
      };
    },
    retrievedMoreArticleList: (state,action: PayloadAction<IArticleListResponse>)=> {
      const {results:articles,page} = action.payload;
      const articleIds = articles.map(article=>article.id);
      articles.forEach(article=> {
        state.loadedArticles[article.id] = article;
      });
      const newArticleIds = [...state.articleIds];
      articleIds.forEach(articleId=>{
        if(newArticleIds.indexOf(articleId)===-1){
          newArticleIds.push(articleId);
        }
      });
      return {
        ...state,
        articleIds:newArticleIds,
        loading:false,
        moreLoading:false,
        currentPage:page || 0,
        moreToFetch: !(articleIds.length<state.limit),
      };
    },
    retrievedArticleInfo:(state,action:PayloadAction<IArticleInfo[]>)=>{
      const articlesInfo = action.payload;
      const infoMap:{[key:string]:IArticleInfo} = {};
      articlesInfo.forEach((info:IArticleInfo)=>{
        infoMap[info.article] = info;
      });
      state.articlesInfo = infoMap;
    },
    changedFilter: (state,action:PayloadAction<IArticleFilter>) => {
      state.filters = {...state.filters,...action.payload}
    },
    setSearchText : (state,action:PayloadAction<{query:string,all?:boolean}>) => {
      const {query,all=false} = action.payload;
      //if all is set remove all applied filter
      if(all){
        state.filters = {...state.filters,tagName:null,hideRead:null,q:query};
      }else{
        state.filters = {...state.filters,q:query};
      }
    },
    markedRead: (state,action:PayloadAction<{articleId:string,updateReadLater?:boolean}>)=>{
      const {articleId,updateReadLater=false} = action.payload;
      const info = state.articlesInfo[articleId];
      if(info){
        state.articlesInfo[articleId] = {...info,isRead:true,readLater:updateReadLater?false:info.readLater};
      }
    },
    markedUnRead: (state,action:PayloadAction<{articleId:string}>)=>{
      const {articleId} = action.payload;
      const info = state.articlesInfo[articleId];
      if(info){
        state.articlesInfo[articleId] = {...info,isRead:false};
      }
    },
    markedImportant: (state,action:PayloadAction<{articleId:string}>)=>{
      const {articleId} = action.payload;
      const info = state.articlesInfo[articleId];
      if(info){
        state.articlesInfo[articleId] = {...info,important:true};
      }
    },
    markedUnImportant: (state,action:PayloadAction<{articleId:string}>)=>{
      const {articleId} = action.payload;
      const info = state.articlesInfo[articleId];
      if(info){
        state.articlesInfo[articleId] = {...info,important:false};
      }
    },
    markedReadLater: (state,action:PayloadAction<{articleId:string,updateRead?:boolean}>)=>{
      const {articleId,updateRead=true} = action.payload;
      const info = state.articlesInfo[articleId];
      if(info){
        state.articlesInfo[articleId] = {
          ...info,
          isRead:updateRead?false:info.isRead,
          readLater:true
        };
      }
    },
    removedReadLater: (state,action:PayloadAction<{articleId:string}>)=>{
      const {articleId} = action.payload;
      const info = state.articlesInfo[articleId];
      if(info){
        state.articlesInfo[articleId] = {...info,readLater:false};
      }
    },

  }
})

export const {
  requestedArticleList,
  requestedMoreArticleList,
  retrievedArticleList,
  retrievedMoreArticleList,
  retrievedArticleInfo,
  changedFilter,
  setSearchText,
  markedRead,
  markedUnRead,
  markedImportant,
  markedUnImportant,
  markedReadLater,
  removedReadLater,
} = articleSlice.actions;

export default articleSlice.reducer;
