import React, {useState} from 'react';
import ReactTimeAgo from 'react-time-ago'
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import useStyles from './tagRowStyle';

import {ITagDocument} from 'services/tag.service';
import {doListTagFeeds} from 'hooks/feed';
import {doListTagArticles} from 'hooks/article';
import {doSubscribe} from 'hooks/tag';
import getActivePage from 'app/getActivePage';

interface OwnProps{
  index: number;
  style: any;
}

const mapState = (state: RootState, ownProps: OwnProps) => {
  let tagId,tag,newCount,isSelected;
  const isLogged = !!state.auth.user;
  const isFeedActive = getActivePage()==="feeds";
  if(ownProps.index>0){
    tagId = state.tags.subscribedIds[ownProps.index-1];
    tag = state.tags.loadedTags[tagId];
    newCount= state.tags.newCounts[tag.name] || 0;
    isSelected= isFeedActive
      ?(state.feeds.filters.tagName === tag.name)
      :(state.articles.filters.tagName === tag.name);
  } else{
    tag = null
    newCount = 0;
    isSelected = isFeedActive
      ?(!state.feeds.filters.tagName)
      :(!state.articles.filters.tagName)
  }
  return {
    tag,
    newCount,
    isSelected,
    isLogged,
  }
};

const mapDispatch = (dispatch:AppDispatch) => ({
  setSelectedFeedTag(tag:any){
    dispatch(doListTagFeeds((tag?tag.name:null)));
  },
  setSelectedArticleTag(tag:any){
    dispatch(doListTagArticles(tag?tag.name:null));
  },
  unsubscribe(tag:ITagDocument | null){
    if(tag) dispatch(doSubscribe({tag,value:false}));
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const SubscribedTagRow = ({
  index,
  style,
  tag,
  newCount,
  isSelected,
  unsubscribe,
  setSelectedFeedTag,
  setSelectedArticleTag,
  isLogged,
}:Props) => {
  const classes = useStyles();
  const [toolOpen,setToolOpen] = useState(false); 
  const handleTagClick= (e:any)=>{
    if(isLogged){
      setSelectedFeedTag(tag);
    }
    else{
      setSelectedArticleTag(tag);
    }
  }
  const handleArticleBtnClick = (e:any) =>{
    e.stopPropagation();
    setSelectedArticleTag(tag);
  }
  const handleSubscribeBtnClick = (e:any) =>{
    e.stopPropagation();
    unsubscribe(tag);
  }
  return (
    <ListItem button
      key={`f${tag?tag.id:'all'}`}
      style={style}
      className={classes.feedItem}
      selected={isSelected}
      onClick={handleTagClick}
      onMouseEnter={(e)=>{setToolOpen(true);}}
      onMouseLeave={(e)=>{setToolOpen(false);}}
    > 
      <ListItemText primary={tag?tag.name.toUpperCase():'All'} className={classes.feedItemText}/>
      {!toolOpen && tag?.lastUpdated && (
        <div className={classes.timeText}>
          <ReactTimeAgo date={new Date(tag.lastUpdated)} locale="en-US" timeStyle="round-minute"/>
        </div>
      )}
      {newCount?(
      <Badge badgeContent={newCount} color="primary" className={classes.feedBadge}></Badge>
      ):''}
      {toolOpen && (
        <div className={classes.feedItemToolBar}>
          <Tooltip title="View Articles">
            <IconButton size="small" onClick={handleArticleBtnClick}>
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
          {/*<Tooltip title="Mark All Read">
            <IconButton size="small" onClick={handleMarkAllReadBtnClick}>
              <CheckBoxOutlinedIcon />
            </IconButton>
          </Tooltip>*/}
          {tag && (
          <Tooltip title={isLogged?"Unsubscribe":"Subscribe"}>
            <IconButton size="small" onClick={handleSubscribeBtnClick}>
              {isLogged?(
                <IndeterminateCheckBoxOutlinedIcon />
              ):(
                <AddBoxOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          )}
        </div>
      )}
    </ListItem>
  );
};
export default connector(SubscribedTagRow);

