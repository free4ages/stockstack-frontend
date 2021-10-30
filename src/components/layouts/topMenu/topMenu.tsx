import React from "react";
import clsx from "clsx";
// material components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import topMenuStyle from "./topMenuStyle";



export const TopMenu = () => {
  const classes = topMenuStyle();

  const className = clsx(classes.appBar,{});
  return (
    <AppBar position="fixed" className={className}>
      <Toolbar className={clsx(classes.toolbar)}>
        <Typography>StockStack</Typography>
        <div>
          <Tooltip title="Settings">
            <IconButton color="inherit" onClick={()=>{}}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={()=>{}} className={classes.logoutButton}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
  
}
export default TopMenu;
