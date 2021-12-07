import React, {useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {IFeedDocument} from 'services/feed.service';
import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';


import ColorizeIcon from '@material-ui/icons/Colorize';
import CreateIcon from '@material-ui/icons/Create';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme:Theme) => ({
  paperRoot:{
    padding:10,
    '& .MuiListItem-root':{
      padding:0,
    },
    '& .MuiListItemIcon-root':{
      padding:2,
      minWidth: 30
    },
    '& .donecon':{
      width:'100%',
      textAlign:'center',
      '& button':{
        backgroundColor:'#91dcdf'
      }
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
  changeFeedPin: any;
  selectedTag: string | null | undefined;
}
const TopToolBar = ({
  feed,
  changeFeedPin,
  selectedTag
}:OwnProps) => {
  const classes = useStyles();
  const [topToolOpen,setTopToolOpen] = useState<boolean>(false);
  const [anchorEl,setAnchorEl] = useState(null);
  const [pinnedTags,setPinnedTags] = useState(feed.pinTags || []);
  const isPinned=selectedTag?(!!(feed.pinTags && feed.pinTags.length && (feed.pinTags.indexOf(selectedTag || "")!==-1))):!!(feed.pinTags && feed.pinTags.length);

  const handlePinClick = (e:any) =>{
    if(isPinned){
      if(selectedTag && feed.pinTags && feed.pinTags.length && feed.pinTags.indexOf(selectedTag)!==-1){
        changeFeedPin(feed,null,[selectedTag]);
      }
      else if(feed.pinTags && feed.tags && feed.tags.length===1 && feed.pinTags.length==1 && feed.pinTags[0]===feed.tags[0]){
        changeFeedPin(feed,null,feed.pinTags);
      }
      else if(feed.tags && feed.tags.length){
        setAnchorEl(e.currentTarget);
      }
    }else if(!selectedTag){
      if(feed.tags && feed.tags.length){
        if(feed.tags.length>1){
          setAnchorEl(e.currentTarget);
        }
        else{
          changeFeedPin(feed,feed.tags,null);
        }
      }
    }else{
      changeFeedPin(feed,[selectedTag],null);
    }
  }

  const handlePinSubmit = () => {
    const addedTags = pinnedTags.filter(tagName=>((feed.pinTags || []).indexOf(tagName)===-1));
    const removedTags = (feed.pinTags || []).filter(tagName => (pinnedTags.indexOf(tagName)===-1));
    if(addedTags.length || removedTags.length){
      changeFeedPin(feed,addedTags,removedTags);
    }
    setAnchorEl(null);
    setTopToolOpen(false);
  }

  const handleClose = () =>{
    setAnchorEl(null);
    setTopToolOpen(false);
  }

  const toggleTag = (tag:string) => {
    const index = pinnedTags.indexOf(tag);
    if(index===-1){
      setPinnedTags([...pinnedTags,tag]);
    }
    else{
      setPinnedTags([...(pinnedTags.slice(0,index)),...(pinnedTags.slice(index+1))])
    }
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
      {(anchorEl && feed.tags && feed.tags.length) && (
      <Popover
        id={feed.id}
        open={!!anchorEl}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{vertical:"bottom",horizontal:"left"}}
        transformOrigin={{vertical:"top",horizontal:"right"}}
      >
        <Paper classes={{root:classes.paperRoot}}>
          <Typography variant="subtitle2">Select Tags</Typography>
          <MenuList disablePadding>
            {feed.tags.map((tag)=>(
              <MenuItem key={tag} onClick={()=>toggleTag(tag)}>
                <ListItemIcon>
                  {(pinnedTags.indexOf(tag)===-1)?(
                    <RadioButtonUncheckedIcon />
                  ):(
                    <CheckCircleOutlineIcon />
                  )}
                </ListItemIcon>
                <Typography variant="inherit">{tag}</Typography>
              </MenuItem>
            ))}
          </MenuList>
          <div className="donecon">
            <Button size="small" onClick={handlePinSubmit}>Done</Button>
          </div>
        </Paper>
      </Popover>
      )}
    </div>
  );
}
export default TopToolBar;
