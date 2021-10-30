import React from 'react';
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import FeedRow from './feedRow';

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

const FeedList = ({
  searchOpen,
}:any) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.articleContainer,{[classes.articleContainerShifted]:searchOpen})}>
      <FeedRow />
      <FeedRow />
      <FeedRow />
      <FeedRow />
      <FeedRow />
      <FeedRow />
      <FeedRow />
    </div>
  );

};
export default FeedList;
