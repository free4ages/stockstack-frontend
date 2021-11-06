import React, {useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import clsx from "clsx";
import {RootState} from 'app/store';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Feed from './feed';

const useStyles = makeStyles((theme:Theme) => ({
  feedContainer:{
    overflowY:'scroll',
    height:'calc(100vh - 144px - 15px)',
    paddingLeft:24,
    paddingRight:24,
    marginTop:5
  },
  feedContainerShifted:{
    height:'calc(100vh - 144px - 15px - 48px)',
  },
}));

interface OwnProps{
  searchOpen: boolean;
}

const mapState = (state: RootState) => ({
  feedIds: state.feeds.feedIds,
});

const mapDispatch = {

};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Feeds = ({
  searchOpen,
  feedIds,
}:Props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.feedContainer,{[classes.feedContainerShifted]:searchOpen})}>
      {feedIds.map(feedId => 
        <Feed key={feedId} feedId={feedId}/>
      )}
    </div>
  );
}
export default connector(Feeds);
