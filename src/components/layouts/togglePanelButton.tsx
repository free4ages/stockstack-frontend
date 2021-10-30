import React,{useState} from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";

import IconButton from "@material-ui/core/IconButton";
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
const useStyles = makeStyles((theme:Theme) => ({
  shiftBtnLeft:{
    top: 70,
    position:'absolute',
    left:0,
    zIndex: 100
  },
  shiftBtnRight:{
    top: 70,
    position:'absolute',
    right:0,
    zIndex: 100
  },
  arrowButton:{
    '&:hover':{
      backgroundColor:'inherit'
    },
    padding:5,
    color:'#cad0d7'

  },
  arrowButtonIcon:{
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short
    })
  },
  arrowLeft:{
    transform: "rotate(-180deg)"
  },
  arrowRight:{
    transform: "rotate(0)"
  }
}));

export const TogglePanelButton = ({
  position="left",
  isOpen=true,
  setIsOpen
}:any)=>{
  const classes = useStyles();
  const conClassName = position==="left"?"shiftBtnLeft":"shiftBtnRight";
  const openClassName = position==="left"?"arrowLeft":"arrowRight";
  const closeClassName = position==="left"?"arrowRight":"arrowLeft";
  return (
    <div className={classes[conClassName]}>
        <Tooltip title="Mark Important">
          <IconButton className={classes.arrowButton} onClick={()=>{setIsOpen(!isOpen)}}>
            <DoubleArrowOutlinedIcon className={clsx(classes.arrowButtonIcon,{[classes[openClassName]]:isOpen,[classes[closeClassName]]:!isOpen})}/>
          </IconButton>
        </Tooltip>
    </div>
  );
};

export default TogglePanelButton;

