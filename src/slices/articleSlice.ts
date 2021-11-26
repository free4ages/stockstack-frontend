import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {IArticleDocument,IArticleListResponse,IArticleListParams} from 'services/article.service';

export interface IArticleInfo{
  _id: string; //articleId
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
  sortBy ?: 'pubDate:desc' | 'retrieveDate:desc' | 'default';
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
  pageSize ?: number;
  requestedFilter: string;
}

type IArticleListPayload = IArticleListResponse & {requestedFilter:string,updatedFilter?:IArticleFilter}

const initialState: IArticleState = {
  articleIds: [],
  articlesInfo: {},
  loadedArticles: {},
  filters: {
    q: null,
    tagName: null,
    sortBy: 'default',
    hideRead: false,
  },
  loading: false,
  moreLoading: false,
  fullLoading: false,
  moreToFetch: true,
  pageSize:25,
  currentPage: 0,
  requestedFilter: "",
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers:{
    requestedArticleList: (state,action:PayloadAction<IArticleListParams>) => {
      return {...state,fullLoading:true,loading:true,requestedFilter:JSON.stringify(action.payload)};
    },
    requestedMoreArticleList: (state,action:PayloadAction<IArticleListParams>) => {
      return {...state,moreLoading:true,loading:true,requestedFilter:JSON.stringify(action.payload)};
    },
    retrievedArticleList: (state,action:PayloadAction<IArticleListPayload>)=>{
      const {results:articles,page=1,requestedFilter,updatedFilter={}} = action.payload;
      if(requestedFilter !== state.requestedFilter){
        return state;
      } 
      const articleIds = articles.map(article=>article.id);
      const articleMap:{[key:string]:IArticleDocument} = {};
      articles.forEach(article=> {
        articleMap[article.id] = article;
      });
      state.filters={...updatedFilter};
      state.articleIds = articleIds;
      state.loadedArticles = articleMap;
      state.loading = false;
      state.fullLoading = false;
      state.currentPage = page;
      state.moreToFetch = !!(articleIds.length>=(state.pageSize || initialState.pageSize || 10));
      state.requestedFilter = "";
    },
    retrievedMoreArticleList: (state,action: PayloadAction<IArticleListPayload>)=> {
      const {results:articles,page,requestedFilter} = action.payload;
      if(requestedFilter !== state.requestedFilter){
        return state;
      } 
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
      state.articleIds = newArticleIds;
      state.loading = false;
      state.moreLoading = false;
      state.currentPage = page || 1;
      state.moreToFetch= !!(articleIds.length>=(state.pageSize || initialState.pageSize || 25));
    },
    retrievedArticleInfo:(state,action:PayloadAction<IArticleInfo[]>)=>{
      const articlesInfo = action.payload;
      const infoMap:{[key:string]:IArticleInfo} = {};
      articlesInfo.forEach((info:IArticleInfo)=>{
        infoMap[info.article] = info;
      });
      state.articlesInfo = infoMap;
    },
    retrievedMoreArticleInfo:(state,action:PayloadAction<IArticleInfo[]>)=>{
      const articlesInfo = action.payload;
      articlesInfo.forEach((info:IArticleInfo)=>{
        state.articlesInfo[info.article] = info;
      });
    },
    retrievedNewArticle:(state,action:PayloadAction<IArticleDocument>)=>{
      const article = action.payload;
      const activeTag = state.filters.tagName;
      if(state.filters.q) return state;
      if(!activeTag || (article.tags && article.tags.length && article.tags.indexOf(activeTag)!==-1)){
        state.loadedArticles[article.id] = article; 
        if(state.articleIds.indexOf(article.id)===-1){
          state.articleIds.unshift(article.id);
        }
      }
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
      const info = state.articlesInfo[articleId] || {article:articleId};
      state.articlesInfo[articleId] = {...info,isRead:true,readLater:updateReadLater?false:info.readLater};
    },
    markedUnRead: (state,action:PayloadAction<{articleId:string}>)=>{
      const {articleId} = action.payload;
      const info = state.articlesInfo[articleId] || {article:articleId};
      state.articlesInfo[articleId] = {...info,isRead:false};
    },
    markedImportant: (state,action:PayloadAction<{articleId:string}>)=>{
      const {articleId} = action.payload;
      const info = state.articlesInfo[articleId] || {article:articleId};
      state.articlesInfo[articleId] = {...info,important:true};
    },
    markedUnImportant: (state,action:PayloadAction<{articleId:string}>)=>{
      const {articleId} = action.payload;
      const info = state.articlesInfo[articleId] || {article:articleId};
      state.articlesInfo[articleId] = {...info,important:false};
    },
    markedReadLater: (state,action:PayloadAction<{articleId:string,updateRead?:boolean}>)=>{
      const {articleId,updateRead=true} = action.payload;
      const info = state.articlesInfo[articleId] || {article:articleId};
      state.articlesInfo[articleId] = {
        ...info,
        isRead:updateRead?false:info.isRead,
        readLater:true
      };
    },
    removedReadLater: (state,action:PayloadAction<{articleId:string}>)=>{
      const {articleId} = action.payload;
      const info = state.articlesInfo[articleId] || {article:articleId};
      state.articlesInfo[articleId] = {...info,readLater:false};
    },

  }
})

export const {
  requestedArticleList,
  requestedMoreArticleList,
  retrievedArticleList,
  retrievedMoreArticleList,
  retrievedArticleInfo,
  retrievedMoreArticleInfo,
  changedFilter,
  setSearchText,
  markedRead,
  markedUnRead,
  markedImportant,
  markedUnImportant,
  markedReadLater,
  removedReadLater,
  retrievedNewArticle,
} = articleSlice.actions;

export default articleSlice.reducer;
