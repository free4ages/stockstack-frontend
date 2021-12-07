import React, {useState,useEffect,useRef} from 'react';
import ReactTimeAgo from 'react-time-ago'
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
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';

import truncate from 'utils/truncate';

import {
  doToggleRead,
  doToggleImportant,
  doToggleReadLater,
  doChangePinStatus,
} from 'hooks/feed';

import TopToolBar from './topToolBar';

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
    transition: 'background-color 2s',
    position:'relative',
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
  topActionButton:{
    marginLeft:5,
    padding:5,
    fontSize:12,
    color:'#202124',
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
  },
  paperUnseen:{
    backgroundColor:'#f1f7e6',
  },
  feedToolBar:{
    position:'absolute',
    right:0,
    top:0,
    '& .MuiIconButton-root:hover':{
      backgroundColor:'inherit'
    },
    minWidth:30,
    height:25
  }
}));

interface OwnProps{
  feedId: string;
  readObserver: any;
  seenObserver: any;
}

const mapState = (state: RootState,ownProps: OwnProps) => {
  const feed = state.feeds.loadedFeeds[ownProps.feedId];
  const isPinned = !!(feed.pinTags && feed.pinTags.length && (feed.pinTags.indexOf(state.feeds.filters.tagName || "")!==-1));
  return {
    feed,
    readMode: !!state.feeds.readMode,
    selectedTag: state.feeds.filters.tagName,
    isPinned,
  }
};

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
  changePinStatus(feed:IFeedDocument,addTagNames:string[]|null,removeTagNames:string[]|null){
    dispatch(doChangePinStatus(feed,addTagNames,removeTagNames));
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
  changePinStatus,
  readObserver,
  seenObserver,
  readMode,
  selectedTag,
  isPinned,
}:Props) => {
  console.log("Rendering feed");
  const classes = useStyles();
  const ref = useRef<HTMLInputElement>(null);
  const [topToolOpen,setTopToolOpen] = useState<boolean>(false);

  useEffect(()=>{
    const observer = readObserver.current;
    const observeRef = ref.current;
    if(observeRef && observer && readMode && !feed.isRead){
      //console.log("Observing feed",feed.title);
      observer.observe(ref.current);
      return ()=> observer.unobserve(observeRef);
    }
  },[ref.current,readObserver.current,readMode,feed.isRead])

  useEffect(()=>{
    const observer = seenObserver.current;
    const observeRef = ref.current;
    if(observeRef && observer && !feed.isSeen){
      //console.log("Observing feed",feed.title);
      observer.observe(ref.current);
      return ()=> observer.unobserve(observeRef);
    }
  },[ref.current,seenObserver.current,feed.isSeen])

  return (
    <Paper 
      ref={ref} 
      data-id={feed.id} 
      elevation={0} 
      className={clsx(classes.root,{
        [classes.paperRead]:(feed.isRead && !isPinned),
        [classes.paperUnseen]:!feed.isSeen
      })}
    >
      <div>
        <div className={classes.heading}>
          {feed.title}
        </div>
        <div className={classes.shortText}>
          {truncate(feed.shortText || "",150)}
        </div>
        <div className={classes.bottomText}>
          <div className={classes.timeText}>
            {feed.pubDate && (
            <ReactTimeAgo date={new Date(feed.pubDate)} locale="en-US" timeStyle="round-minute"/>
            )}
            {` [ ${feed.sourceDomain} ]`}
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
          {feed.link && (
          <Tooltip title="Open Link">
            <Link classes={{root:classes.actionButton}} className={clsx(classes.actionButtonActive)} href={feed.link} target="_blank">
              <LaunchOutlinedIcon />
            </Link>
          </Tooltip>
          )}
          {feed.attachmentLink && (
          <Tooltip title="Open Link">
            <Link classes={{root:classes.actionButton}} className={clsx(classes.actionButtonActive)} href={feed.attachmentLink} target="_blank">
              <DescriptionOutlinedIcon />
            </Link>
          </Tooltip>
          )}
          </div>
        </div>
        <TopToolBar feed={feed} changeFeedPin={changePinStatus} selectedTag={selectedTag}/>
      </div>
    </Paper>
  );
}

export default connector(Feed);
