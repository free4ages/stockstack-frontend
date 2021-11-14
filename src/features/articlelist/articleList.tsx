import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {Articles,ArticleListFilter} from './components';
import {doListArticles} from 'hooks/article';

interface OwnProps{
}

const mapState = (state: RootState) => ({
  filters: state.articles.filters,
});

const mapDispatch = (dispatch:AppDispatch) => ({
  listArticles(filters:any){
    dispatch(doListArticles(filters))
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const ArticleList = ({
  listArticles,
  filters,
}:Props) => {
  const [searchOpen,setSearchOpen] = useState(false);

  useEffect(()=> listArticles(filters),[filters]);
  return (
    <>
      <ArticleListFilter searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
      <Articles searchOpen={searchOpen} />
    </>
  );
}

export default connector(ArticleList);
