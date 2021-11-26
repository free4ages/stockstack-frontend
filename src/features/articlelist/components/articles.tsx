import React from 'react';
import { ConnectedProps,connect } from 'react-redux'
import clsx from "clsx";
import {RootState,AppDispatch} from 'app/store';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Article from './article';
import LoadMore from 'components/loadMore';
//import RenderIfVisible from 'components/renderIfVisible';

//import LoadMore from 'components/loadMore';
import ListPlaceHolder from 'components/listPlaceHolder';

const useStyles = makeStyles((theme:Theme) => ({
  articleContainer:{
    overflowY:'scroll',
    height:'calc(100vh - 144px - 15px)',
    paddingLeft:24,
    paddingRight:24,
    marginTop:5
  },
  articleContainerShifted:{
    height:'calc(100vh - 144px - 15px - 48px)',
  },
}));


interface OwnProps{
  searchOpen: boolean;
  showLoadMore: boolean;
  setLoadMore: (value:boolean) => void;
}

const mapState = (state: RootState) => ({
  articleIds: state.articles.articleIds,
  fullLoading: state.articles.fullLoading,
  loading: state.articles.loading,
  moreToFetch: state.articles.moreToFetch,
  filters: state.articles.filters,
  currentPage: state.articles.currentPage
});

const mapDispatch = (dispatch:AppDispatch) => ({
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Articles = ({
  searchOpen,
  articleIds,
  showLoadMore,
  setLoadMore,
  fullLoading,
}:Props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.articleContainer,{[classes.articleContainerShifted]:searchOpen})}>
      {fullLoading?(
        <ListPlaceHolder />
      ):articleIds.length?(
        <>
          {articleIds.map(articleId => 
            <Article key={articleId} articleId={articleId}/>
          )}
          <LoadMore show={showLoadMore} setLoadMore={setLoadMore}/>
        </>
      ):null}
    </div>
  );
}
export default connector(Articles);
