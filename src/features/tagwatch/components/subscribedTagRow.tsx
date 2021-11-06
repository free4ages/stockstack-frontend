import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

import useStyles from './tagRowStyle';

import {history} from 'app/history';
import {changedFilter} from 'slices/feedSlice';

interface OwnProps{
  index: number;
  style: any;
}

const mapState = (state: RootState, ownProps: OwnProps) => {
  let tagId,tag,newCount,isSelected;
  if(ownProps.index>0){
    tagId = state.tags.subscribedIds[ownProps.index-1];
    tag = state.tags.loadedTags[tagId];
    newCount= state.tags.newCounts[tagId] || 0;
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
    dispatch(changedFilter({tagName:tag?tag.name:null}));
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
      {newCount?(
      <Badge badgeContent={newCount} color="primary" className={classes.feedBadge}></Badge>
      ):''}
      {toolOpen && (
        <div className={classes.feedItemToolBar}>
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

