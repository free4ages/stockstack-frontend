import React, {useState} from 'react';
import moment from 'moment';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {IFeedDocument} from 'services/feed.service';
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';

import {
  doToggleRead,
  doToggleImportant,
  doToggleReadLater
} from 'hooks/feed';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    overflow: 'hidden',
    border:'1px solid #dfe1e5',
    borderRadius: 8,
    boxShadow: 'none',
    marginBottom: 16,
    fontWeight:'normal',
    fontFamily:'arial,sans-serif',
    color:'#202124',
    padding:16,
    paddingBottom:10,
  },
  heading:{
    whiteSpace:'normal',
    fontSize:18,
    lineHeight:'1.33em',
    fontFamily:'Roboto-Medium,sans-serif',
  },
  shortText:{
    marginTop:8,
    color:'#70757a',
    fontSize:14,
    lineHeight:1.43,
    whiteSpace:'normal',
  },
  bottomText:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    fontSize:12,
    color:'#70757a',
    lineHeight:1.34,
    marginTop:8,
  },
  timeText:{
    flex:'1 0 auto',
  },
  tagChips:{
    display:'flex',
    alignItems: 'center',
    flex:'1 0 auto',
    '& > *':{
      margin: theme.spacing(0.5),
    }
  },
  chipRoot:{
    color:'#70757a',
    fontSize:12,
  },
  sourceText:{
    textAlign:'right',
  },
  actionButton:{
    marginLeft:5,
    padding:0,
    fontSize:12,
    color:'#e2e6eb',
    '&:hover':{
      backgroundColor:'inherit'
    },
    '& .MuiSvgIcon-root':{
      fontSize:15
    }
  },
  actionButtonActive:{
    color:'#70757a',
  },
  paperRead:{
    opacity:0.4,
  }
}));

interface OwnProps{
  feedId: string;
}

const mapState = (state: RootState,ownProps: OwnProps) => ({
  feed: state.feeds.loadedFeeds[ownProps.feedId]
});

const mapDispatch = (dispatch:AppDispatch) =>({
  toggleRead(feed:IFeedDocument,value:boolean){
    dispatch(doToggleRead(feed,value));
  },
  toggleImportant(feed:IFeedDocument,value:boolean){
    dispatch(doToggleImportant(feed,value));
  },
  toggleReadLater(feed:IFeedDocument,value:boolean){
    dispatch(doToggleReadLater(feed,value));
  },
});
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Feed = ({
  feed,
  toggleRead,
  toggleImportant,
  toggleReadLater,
}:Props) => {
  console.log("Rendering feed");
  const classes = useStyles();
  return (
    <Paper elevation={0} className={clsx(classes.root,{[classes.paperRead]:feed.isRead})}>
      <div>
        <div className={classes.heading}>
          {feed.title}
        </div>
        <div className={classes.shortText}>
          {feed.shortText}
        </div>
        <div className={classes.bottomText}>
          <div className={classes.timeText}>
            <span>{moment(feed.pubDate).fromNow()}  [ {feed.sourceDomain} ]</span>
          </div>
          {(feed.tags && feed.tags.length)? (
          <div className={classes.tagChips}>
            {feed.tags.slice(0,3).map(tag=>(
              <Chip key={tag} classes={{root:classes.chipRoot}} variant="outlined" size="small" label={tag} />
            ))}
            {feed.tags.length>3 && 
              <div className={classes.chipRoot}>
                <span>+{feed.tags.length-3} more</span>
              </div>
            }
          </div>
          ):''}
          <div className={classes.sourceText}>
          <Tooltip title={feed.important?"Mark UnImportant":"Mark Important"}>
            <IconButton classes={{root:classes.actionButton}} className={clsx({[classes.actionButtonActive]:feed.important})} onClick={()=>toggleImportant(feed,!feed.important)}>
              {feed.important ?( 
                <StarIcon />
              ):(
                <StarBorderOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title={feed.readLater?"Remove":"Read Later"}>
            <IconButton classes={{root:classes.actionButton}} className={clsx({[classes.actionButtonActive]:feed.readLater})} onClick={()=>toggleReadLater(feed,!feed.readLater)}>
              {feed.readLater?(
                <TurnedInIcon />
              ):(
                <TurnedInNotIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title={feed.isRead?"Mark Unread":"Mark Read"}>
            <IconButton classes={{root:classes.actionButton}} className={clsx({[classes.actionButtonActive]:feed.isRead})} onClick={()=>{ toggleRead(feed,!feed.isRead);}}>
              {feed.isRead?(
                <CheckCircleIcon />
              ):(
                <RadioButtonUncheckedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Open Link">
            <Link classes={{root:classes.actionButton}} className={clsx(classes.actionButtonActive)} href={feed.link} target="_blank">
              <LaunchOutlinedIcon />
            </Link>
          </Tooltip>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default connector(Feed);
