import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {Articles,ArticleListFilter} from './components';
import {doListArticles} from 'hooks/article';

interface OwnProps{
}

const mapState = (state: RootState) => ({
  showLoadMore: !!(state.articles.articleIds.length && state.articles.moreToFetch),
  loading : !!state.articles.loading,
  moreToFetch : !!state.articles.moreToFetch,
});

const mapDispatch = (dispatch:AppDispatch) => ({
  listArticles(){
    dispatch(doListArticles())
  },
  loadMoreArticles(){
    dispatch(doListArticles({loadMore:true}));
  },
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const ArticleList = ({
  listArticles,
  loadMoreArticles,
  showLoadMore,
  loading,
  moreToFetch,
}:Props) => {
  const [searchOpen,setSearchOpen] = useState(false);
  const [everLoaded,setEverLoaded] = useState(false);
  const [loadMore,setLoadMore] = useState(false);
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
