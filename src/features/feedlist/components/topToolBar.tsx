import React, {useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {IFeedDocument} from 'services/feed.service';
import { makeStyles, Theme } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Popover from '@material-ui/core/Popover';


import ColorizeIcon from '@material-ui/icons/Colorize';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme:Theme) => ({
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
  feed: IFeedDocument;
  toggleFeedPin: any;
  selectedTag: string | null | undefined;
}
const TopToolBar = ({
  feed,
  toggleFeedPin,
  selectedTag
}:OwnProps) => {
  const classes = useStyles();
  const [topToolOpen,setTopToolOpen] = useState<boolean>(false);
  const [anchorEl,setAnchorEl] = useState(null);
  const isPinned=!!(feed.pinTags && feed.pinTags.length && (feed.pinTags.indexOf(selectedTag || "")!==-1));

  const handlePinClick = (e:any) =>{
    if(isPinned){
      if(feed.pinTags){
        toggleFeedPin(feed,feed.pinTags,false);
      }
    }else if(!selectedTag){
      if(feed.tags && feed.tags.length){
        if(feed.tags.length>1){
          setAnchorEl(e.currentTarget);
        }
        else{
          toggleFeedPin(feed,feed.tags,true);
        }
      }
    }else{
      toggleFeedPin(feed,[selectedTag],true);
    }
  }

  const handleClose = () =>{
    setAnchorEl(null);
  }
  return (
    <div
      className={classes.feedToolBar}
      onMouseEnter={()=>setTopToolOpen(true)}
      onMouseLeave={()=>setTopToolOpen(false)}
    >
      {(isPinned || topToolOpen) && (feed.tags && feed.tags.length) && (
      <Tooltip title={isPinned?"Unpin Article":"Pin Article"}>
        <IconButton classes={{root:classes.topActionButton}} onClick={handlePinClick}>
          {isPinned?(
            <ColorizeIcon />
          ):(
            <CreateIcon />
          )}
        </IconButton>
      </Tooltip>
      )}
      {anchorEl && (
      <Popover
        id={feed.id}
        open={!!anchorEl}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{vertical:"bottom",horizontal:"left"}}
        transformOrigin={{vertical:"top",horizontal:"right"}}
      >
        Test Content
      </Popover>
      )}
    </div>
  );
}
export default TopToolBar;
