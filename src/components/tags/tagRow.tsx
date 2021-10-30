import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

const useStyles = makeStyles((theme: Theme) =>({
  feedIcon: {
    maxWidth: 16,
    maxHeight: 16,
    margin: "8px 5px 8px 20px",
    width: "100%",
    height: "auto",
  },
  feedItem: {
    lineHeight: 1,
    overflow: "hidden",
    paddingLeft: "35px !important",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 14,
      paddingLeft: "40px !important",
    }
  },
  feedItemText: {
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      marginRight: 25,
    },
    "& span" : {
      maxWidth: "100%",
      overflow: "hidden",
    }
  },
  feedItemToolBar:{
    position:'absolute',
    right:0,
    top:0,
    marginRight:40,
    '& .MuiIconButton-root:hover':{
      backgroundColor:'inherit'
    }
  },
  feedBadge: {
    opacity: 0.6,
    right: 2
  },
  feed: {
    paddingTop: 2,
    paddingBottom: 2,
  },
}));

const TagRow = ({index,style}:any) => {
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
      <ListItemText primary={'TATAPOWER'} className={classes.feedItemText}/>
      <Badge badgeContent={10} color="primary" className={classes.feedBadge}></Badge>
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

export default TagRow;
