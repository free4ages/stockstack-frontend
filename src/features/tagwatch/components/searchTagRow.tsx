import React, {useState} from 'react';
import clsx from 'clsx';
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
import {doSubscribe} from 'hooks/tag';
import {doListTagFeeds} from 'hooks/feed';
import {doListTagArticles} from 'hooks/article';
import getActivePage from 'app/getActivePage';

interface OwnProps{
  tag : ITagDocument;
}
const mapState = (state: RootState,ownProps:OwnProps) => {
  const isFeedActive = getActivePage()==="feeds";
  const tag = ownProps.tag;
  return {
    isSubscribed: state.tags.subscribedIds.indexOf(tag.id) !== -1,
    newCount: state.tags.newCounts[tag.name] || 0,
    isLogged: !!state.auth.user,
    isSelected: isFeedActive
      ? (state.feeds.filters.tagName === tag.name)
      : (state.articles.filters.tagName === tag.name)
  };
};

const mapDispatch = (dispatch:AppDispatch) => ({
  subscribe(tag:ITagDocument){
    dispatch(doSubscribe({tag,value:true}));
  },
  unsubscribe(tag:ITagDocument){
    dispatch(doSubscribe({tag,value:false}));
  },
  setSelectedFeedTag(tag:any){
    dispatch(doListTagFeeds((tag?tag.name:null)));
  },
  setSelectedArticleTag(tag:any){
    dispatch(doListTagArticles(tag?tag.name:null));
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const SearchTagRow = ({
  tag,
  isSubscribed,
  isSelected,
  subscribe,
  unsubscribe,
  newCount,
  isLogged,
  setSelectedFeedTag,
  setSelectedArticleTag,
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

  const handleSubscribe = (e:any) =>{
    e.stopPropagation();
    if(isSubscribed) unsubscribe(tag);
    if(!isSubscribed) subscribe(tag);
  }
  return (
    <ListItem button
      //key={`f${index}`}
      //style={style}
      className={clsx(classes.feedItem,classes.searchRow)}
      selected={isSelected}
      onClick={handleTagClick}
      onMouseEnter={(e)=>{setToolOpen(true);}}
      onMouseLeave={(e)=>{setToolOpen(false);}}
    > 
      <ListItemText primary={tag.name.toUpperCase()} className={classes.feedItemText}/>
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
            <IconButton size="small" onClick={()=>{}}>
              <CheckBoxOutlinedIcon />
            </IconButton>
          </Tooltip>*/}
          <Tooltip title={isSubscribed?"Unsubscribe":"Subscribe"}>
            <IconButton size="small" onClick={handleSubscribe}>
              {isSubscribed?(
                <IndeterminateCheckBoxOutlinedIcon />
              ):(
                <AddBoxOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>
      )}
    </ListItem>
  );
};
export default connector(SearchTagRow);


