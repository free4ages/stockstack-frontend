import React, {useEffect,useState} from 'react';
import clsx from 'clsx';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import useStyles from './tagRowStyle';

import {ITagDocument} from 'services/tag.service';
import {doSubscribe} from 'hooks/tag';

interface OwnProps{
  tag : ITagDocument;
}
const mapState = (state: RootState,ownProps:OwnProps) => ({
  isSubscribed: state.tags.subscribedIds.indexOf(ownProps.tag.id) !== -1,
});

const mapDispatch = (dispatch:AppDispatch) => ({
  subscribe(tag:ITagDocument){
    dispatch(doSubscribe({tag,value:true}));
  },
  unsubscribe(tag:ITagDocument){
    dispatch(doSubscribe({tag,value:false}));
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const SearchTagRow = ({
  tag,
  isSubscribed,
  subscribe,
  unsubscribe
}:Props) => {
  const classes = useStyles();
  const [toolOpen,setToolOpen] = useState(false); 

  const handleSubscribe = (e:any) =>{
    e.preventDefault();
    if(isSubscribed) unsubscribe(tag);
    if(!isSubscribed) subscribe(tag);
  }
  return (
    <ListItem button
      //key={`f${index}`}
      //style={style}
      className={clsx(classes.feedItem,classes.searchRow)}
      selected={false}
      onClick={(e) => {}}
    > 
      <ListItemText primary={tag.name.toUpperCase()} className={classes.feedItemText}/>
        <div className={classes.feedItemToolBar}>
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
    </ListItem>
  );
};
export default connector(SearchTagRow);


