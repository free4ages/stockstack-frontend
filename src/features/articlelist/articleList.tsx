import React, {useEffect,useState,useContext} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {Articles,ArticleListFilter} from './components';
import {IArticleDocument} from 'services/article.service';
import {doListArticles,doSubscribeNewArticle,onFetchNewArticle} from 'hooks/article';
import {WebSocketContext} from 'components/webSocketProvider';

interface OwnProps{
}

const mapState = (state: RootState) => ({
  showLoadMore: !!(state.articles.articleIds.length && state.articles.moreToFetch),
  loading : !!state.articles.loading,
  moreToFetch : !!state.articles.moreToFetch,
  isLogged: !!state.auth.user
});

const mapDispatch = (dispatch:AppDispatch) => ({
  listArticles(){
    dispatch(doListArticles())
  },
  loadMoreArticles(){
    dispatch(doListArticles({loadMore:true}));
  },
  subscribeNewArticle(){
    dispatch(doSubscribeNewArticle());
    return () => dispatch(doSubscribeNewArticle(false));
  },
  receivedNewArticle(article:IArticleDocument){
    dispatch(onFetchNewArticle(article));
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const ArticleList = ({
  listArticles,
  loadMoreArticles,
  isLogged,
  showLoadMore,
  loading,
  moreToFetch,
  receivedNewArticle,
  subscribeNewArticle
}:Props) => {
  const [searchOpen,setSearchOpen] = useState(false);
  const [everLoaded,setEverLoaded] = useState(false);
  const [loadMore,setLoadMore] = useState(false);
  const socket = useContext(WebSocketContext);
  useEffect(()=>{ 
    if(!everLoaded){
      listArticles();
    }
  },[everLoaded,listArticles]);

  useEffect(()=>{
    if(loadMore && !loading && moreToFetch){
      loadMoreArticles();
    }
  },[loadMore])

  useEffect(()=>{
    let unsubscribe:()=>void;
    if(isLogged){
      const handle1 = socket.on('connect',()=>{
        unsubscribe = subscribeNewArticle();
      });
      const handle2 = socket.on('article:new',(data:IArticleDocument)=>{
        receivedNewArticle(data);
      });
      return ()=>{handle1();handle2();unsubscribe();}
    }

  },[socket,isLogged])

  return (
    <>
      <ArticleListFilter searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
      <Articles 
        searchOpen={searchOpen} 
        showLoadMore={showLoadMore}
        setLoadMore={setLoadMore}
      />
    </>
  );
}

export default connector(ArticleList);
