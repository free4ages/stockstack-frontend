import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
//import useStyles from "./styles";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {TopMenu} from './topMenu';
import {RightPanel} from "./rightPanel";
import {LeftPanel} from "./leftPanel";

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: "flex",
  },
  appContent: theme.mixins.gutters({
    //flex: "1 1 100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    maxWidth: "100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    paddingTop: 80, // equal to AppBar height + 16px
    //margin: "0 auto",
    //backgroundColor:'#000',
    // Set the max content width for each breakpoint
    // Content will be centered in the space to the right/left of drawer
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg
    }
  })
}));




const DefaultLayout = ({
  children,
}:{
  children: React.ReactNode;
})=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopMenu />
      <LeftPanel />
      <main className={classes.appContent}>
      {children}
      </main>
      <RightPanel />
    </div>
  );
};

export default DefaultLayout;
