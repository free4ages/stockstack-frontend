import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./styles";

import {TopMenu} from './topMenu';
import {RightPanel} from "./rightPanel";
import {LeftPanel} from "./leftPanel";

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
      <RightPanel />
      <LeftPanel />
      <h1>Hi I am in default layout</h1>
      {children}
    </div>
  );
};

export default DefaultLayout;
