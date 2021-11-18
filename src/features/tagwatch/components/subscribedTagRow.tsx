import React, {useEffect,useState} from 'react';
import moment from 'moment';
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
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import useStyles from './tagRowStyle';

import {history} from 'app/history';
import {doListTagFeeds} from 'hooks/feed';

interface OwnProps{
  index: number;
  style: any;
}

const mapState = (state: RootState, ownProps: OwnProps) => {
  let tagId,tag,newCount,isSelected;
  if(ownProps.index>0){
    tagId = state.tags.subscribedIds[ownProps.index-1];
    tag = state.tags.loadedTags[tagId];
    newCount= state.tags.newCounts[tag.name] || 0;
    isSelected= state.feeds.filters.tagName === tag.name;
  } else{
    tag = null
    newCount = 0;
    isSelected = !state.feeds.filters.tagName
  }
  return {
    tag,
    newCount,
    isSelected
  }
};

const mapDispatch = (dispatch:AppDispatch) => ({
  setSelectedTag(tag:any){
    dispatch(doListTagFeeds((tag?tag.name:null)));
    history.push('/feeds');
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
  setSelectedTag,
}:Props) => {
  const classes = useStyles();
  const [toolOpen,setToolOpen] = useState(false); 
  return (
    <ListItem button
      key={`f${index}`}
      style={style}
      className={classes.feedItem}
      selected={isSelected}
      onClick={(e) => {setSelectedTag(tag)}}
      onMouseEnter={(e)=>{tag && setToolOpen(true);}}
      onMouseLeave={(e)=>{tag && setToolOpen(false);}}
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
            <IconButton size="small" onClick={(e)=>{e.stopPropagation();history.push('/articles')}}>
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark All Read">
            <IconButton size="small" onClick={()=>{}}>
              <CheckBoxOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Unsubscribe">
            <IconButton size="small" onClick={()=>{}}>
              <IndeterminateCheckBoxOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </ListItem>
  );
};
export default connector(SubscribedTagRow);

