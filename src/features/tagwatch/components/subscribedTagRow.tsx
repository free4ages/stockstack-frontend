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

interface OwnProps{
  index: number;
  style: any;
}

const mapState = (state: RootState, ownProps: OwnProps) => {
  const tagId = state.tags.subscribedIds[ownProps.index];
  return {
    tag: state.tags.loadedTags[tagId],
    newCount: state.tags.newCounts[tagId] || 0
  }
};

const mapDispatch = (dispatch:AppDispatch) => ({
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const SubscribedTagRow = ({
  index,
  style,
  tag,
  newCount,
}:Props) => {
  const classes = useStyles();
  const [toolOpen,setToolOpen] = useState(false); 
  return (
    <ListItem button
      key={`f${index}`}
      style={style}
      className={classes.feedItem}
      selected={false}
      onClick={(e) => {}}
      onMouseEnter={(e)=>{setToolOpen(true);}}
      onMouseLeave={(e)=>{setToolOpen(false);}}
    > 
      <ListItemText primary={tag.name.toUpperCase()} className={classes.feedItemText}/>
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

