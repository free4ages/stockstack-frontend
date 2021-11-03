import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk,RootState } from 'app/store'

import {IArticleDocument} from 'services/article.service';


export interface ArticleState{
  articleIds: string[],
  loadedArticles: {[key: string]: IArticleDocument}
  filters : any
}

const initialState: ArticleState = {
  articleIds: [],
  loadedArticles: {},
  filters: {}
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers:{
    retrievedArticleList: (state,action:PayloadAction<IArticleDocument[]>)=>{
      const articles = action.payload;
      const articleIds = articles.map(article=>article.id);
      const articleMap:{[key:string]:IArticleDocument} = {};
      articles.forEach(article=> {
        articleMap[article.id] = article;
      });
      state.articleIds = articleIds;
      state.loadedArticles = articleMap;
    },
  }
})

export const {retrievedArticleList} = articleSlice.actions;

export default articleSlice.reducer;
