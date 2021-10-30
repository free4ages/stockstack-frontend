import React,{useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
//import useStyles from "./styles";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {TopMenu} from './topMenu';
import {RightPanel} from "./rightPanel";
import {LeftPanel} from "./leftPanel";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: "flex",
  },
  appContent: {
    //flex: "1 1 100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    maxWidth: "100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    position:'relative',
    paddingTop: 80, // equal to AppBar height + 16px
    //margin: "0 auto",
    //backgroundColor:'#000',
    // Set the max content width for each breakpoint
    // Content will be centered in the space to the right/left of drawer
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg
    }
  },
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


const ShiftButton = ({
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

const DefaultLayout = ({
  children,
}:{
  children: React.ReactNode;
})=>{
  const classes = useStyles();
  const [leftIsOpen,setLeftIsOpen] = useState(true);
  const [rightIsOpen,setRightIsOpen] = useState(true);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopMenu />
      <LeftPanel />
      <main className={classes.appContent}>
      <ShiftButton isOpen={leftIsOpen} position={"left"} setIsOpen={setLeftIsOpen} />
      <ShiftButton isOpen={rightIsOpen} position={"right"} setIsOpen={setRightIsOpen} />
      {/*<div className={classes.shiftBtnLeft}>
          <Tooltip title="Mark Important">
            <IconButton className={classes.arrowButton} onClick={()=>{setLeftIsOpen(!leftIsOpen)}}>
              <DoubleArrowOutlinedIcon className={clsx(classes.arrowButtonIcon,{[classes.arrowLeft]:leftIsOpen,[classes.arrowRight]:!leftIsOpen})}/>
            </IconButton>
          </Tooltip>
      </div>*/}
      {children}
      </main>
      <RightPanel />
    </div>
  );
};

export default DefaultLayout;
