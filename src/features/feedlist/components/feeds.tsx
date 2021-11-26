import React from 'react';
import { ConnectedProps,connect } from 'react-redux'
import clsx from "clsx";
import {RootState} from 'app/store';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Feed from './feed';
import LoadMore from 'components/loadMore';
import ListPlaceHolder from 'components/listPlaceHolder';

const useStyles = makeStyles((theme:Theme) => ({
  feedContainer:{
    overflowY:'scroll',
    height:'calc(100vh - 144px - 15px)',
    paddingLeft:24,
    paddingRight:24,
    marginTop:5,
    position:'relative',
  },
  feedContainerShifted:{
    height:'calc(100vh - 144px - 15px - 48px)',
  },
  readModeStatus:{
    position:'sticky',
    top:0,
    display:'flex',
    justifyContent:'flex-end',
    '& div':{
      backgroundColor: '#ffffff',
      display:'flex'
    }
  },
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0.3 },
  },
  readModeIcon:{
    animationName: '$blinker',
    animationDuration: '2s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    color:'red'
  }
}));

interface OwnProps{
  searchOpen: boolean;
  showLoadMore: boolean;
  setLoadMore: (value:boolean) => void;
  containerRef: any;
  readObserver: any;
  seenObserver: any;
}

const mapState = (state: RootState) => ({
  feedIds: state.feeds.feedIds,
  fullLoading: !!state.feeds.fullLoading,
  readMode: !!state.feeds.readMode
});

const mapDispatch = {

};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Feeds = ({
  searchOpen,
  feedIds,
  showLoadMore,
  setLoadMore,
  fullLoading,
  containerRef,
  readObserver,
  seenObserver,
  readMode
}:Props) => {
  console.log("Rendering Feeds");
  const classes = useStyles();
  return (
    <div ref={containerRef} className={clsx(classes.feedContainer,{[classes.feedContainerShifted]:searchOpen})}>
      {readMode && (
      <div className={classes.readModeStatus}>
        <div>
          <span style={{padding:2}}> <strong>Reading Mode: </strong> </span>
          <FiberManualRecordIcon className={classes.readModeIcon}/>
        </div>
      </div>
      )}
      {fullLoading?(
        <ListPlaceHolder />
      ):(
        <>
          {feedIds.map(feedId => 
            <Feed 
              key={feedId} 
              feedId={feedId} 
              readObserver={readObserver}
              seenObserver={seenObserver}
            />
          )}
          <LoadMore show={showLoadMore} setLoadMore={setLoadMore}/>
          <div style={{height:window.screen.height-300}}> </div>
        </>
      )}
    </div>
  );
}
export default connector(Feeds);
