import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {IArticleDocument} from 'services/article.service';
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Link from '@material-ui/core/Link';

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import StarIcon from '@material-ui/icons/Star';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';


import truncate from 'utils/truncate';

import {
  doToggleRead,
  doToggleImportant,
  doToggleReadLater
} from 'hooks/article';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    overflow: 'hidden',
    border:'1px solid #dfe1e5',
    borderRadius: 0,
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
  },
}));

interface OwnProps{
  articleId: string;
}

const mapState = (state: RootState,ownProps: OwnProps) => {
  const articleState = state.articles;
  const articleId = ownProps.articleId;
  const info = articleState.articlesInfo;
  return {
    article: articleState.loadedArticles[articleId],
    important: !!info[articleId]?.important,
    isHidden: (!!info[articleId]?.isRead && articleState.filters.hideRead),
    readLater: !!info[articleId]?.readLater,
    isRead: !!info[articleId]?.isRead,
  }
};

const mapDispatch = (dispatch:AppDispatch) =>({
  toggleRead(article:IArticleDocument,value:boolean){
    dispatch(doToggleRead(article,value));
  },
  toggleImportant(article:IArticleDocument,value:boolean){
    dispatch(doToggleImportant(article,value));
  },
  toggleReadLater(article:IArticleDocument,value:boolean){
    dispatch(doToggleReadLater(article,value));
  },
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Article = ({
  article,
  important,
  isHidden,
  readLater,
  isRead,
  toggleImportant,
  toggleReadLater,
  toggleRead
}:Props) => {
  console.log("Rendering article");
  const classes = useStyles();
  return (
    <Paper 
      elevation={0} 
      className={clsx(classes.root,{
        [classes.paperRead]:isRead,
      })}
    >
      <div>
        <div className={classes.heading}>
          {article.displayTitle || article.title}
        </div>
        {article?.shortText && (
        <div className={classes.shortText}>
          {truncate(article.shortText,150)}
        </div>
        )}
        <div className={classes.bottomText}>
          <div className={classes.timeText}>
            {article.pubDate && (
            <ReactTimeAgo date={new Date(article.pubDate)} locale="en-US" timeStyle="round-minute"/>
            )}
          </div>
          {(article.tags && article.tags.length)? (
          <div className={classes.tagChips}>
            {article.tags.slice(0,3).map(tag=>(
              <Chip key={tag} classes={{root:classes.chipRoot}} variant="outlined" size="small" label={tag} />
            ))}
            {article.tags.length>3 && 
              <div className={classes.chipRoot}>
                <span>+{article.tags.length-3} more</span>
              </div>
            }
          </div>
          ):''}
          <div className={classes.sourceText}>
          <Tooltip title={important?"Mark UnImportant":"Mark Important"}>
            <IconButton classes={{root:classes.actionButton}} className={clsx({[classes.actionButtonActive]:important})} onClick={()=>toggleImportant(article,!important)}>
              {important ?( 
                <StarIcon />
              ):(
                <StarBorderOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title={readLater?"Remove":"Read Later"}>
            <IconButton classes={{root:classes.actionButton}} className={clsx({[classes.actionButtonActive]:readLater})} onClick={()=>toggleReadLater(article,!readLater)}>
              {readLater?(
                <TurnedInIcon />
              ):(
                <TurnedInNotIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title={isRead?"Mark Unread":"Mark Read"}>
            <IconButton classes={{root:classes.actionButton}} className={clsx({[classes.actionButtonActive]:isRead})} onClick={()=>{ toggleRead(article,!isRead);}}>
              {isRead?(
                <CheckCircleIcon />
              ):(
                <RadioButtonUncheckedIcon />
              )}
            </IconButton>
          </Tooltip>
          {article.link && (
            <Tooltip title="Open Link">
              <Link classes={{root:classes.actionButton}} className={clsx(classes.actionButtonActive)} href={article.link} target="_blank">
                <LaunchOutlinedIcon />
              </Link>
            </Tooltip>
          )}
          {article.attachmentLink && (
            <Tooltip title="Open File">
              <Link classes={{root:classes.actionButton}} className={clsx(classes.actionButtonActive)} href={article.attachmentLink} target="_blank">
                <DescriptionOutlinedIcon />
              </Link>
            </Tooltip>
          )}
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default connector(Article);
