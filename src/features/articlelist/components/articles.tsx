import React, {useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import clsx from "clsx";
import {RootState} from 'app/store';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Article from './article';

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
}

const mapState = (state: RootState) => ({
  articleIds: state.articles.articleIds,
});

const mapDispatch = {

};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Articles = ({
  searchOpen,
  articleIds,
}:Props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.articleContainer,{[classes.articleContainerShifted]:searchOpen})}>
      {articleIds.map(articleId => 
        <Article key={articleId} articleId={articleId}/>
      )}
    </div>
  );
}
export default connector(Articles);
