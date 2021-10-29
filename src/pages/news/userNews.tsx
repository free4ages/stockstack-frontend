import React from 'react';
import clsx from "clsx";
// material components
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InputBase from "@material-ui/core/InputBase";

import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FilterAllIcon from "@material-ui/icons/IndeterminateCheckBox";
import Close from "@material-ui/icons/Close";
import MarkAllAsReadIcon from "@material-ui/icons/LibraryAddCheck";
import FilterFavoriteIcon from "@material-ui/icons/Star";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const useStyles = makeStyles((theme:Theme) => ({
  toolbar: {
    justifyContent: "space-between",
  },
  logoutButton: {
    marginRight: -15
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
}));
const UserNewsPage = () => {
  const classes = useStyles();
  return (
  <>
      <Toolbar className={clsx(classes.toolbar)}>
        <Typography>JARR</Typography>
        <div>
          <Tooltip title="Show All">
            <IconButton onClick={()=>{}}>
              <FilterAllIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show All">
            <IconButton onClick={()=>{}}>
              <FilterFavoriteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark All As Read">
            <IconButton  onClick={()=>{}}>
              <MarkAllAsReadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark All As Read">
            <IconButton color="inherit" onClick={()=>{}}>
              <MarkAllAsReadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Hide feed list">
            <IconButton onClick={()=>{}}>
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
      <SearchBar />
    <h1>I am in usernews page and this is a very very long test to test the boundary of the main body. Hope ths will get wrapped instead of hiding</h1>
    </>
  )

};

export default UserNewsPage;

