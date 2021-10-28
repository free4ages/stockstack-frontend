import React, { useState } from "react";
import clsx from "clsx";
// material components
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

// material icons
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FilterAllOrFavoriteIcon from "@material-ui/icons/StarBorder";
import FilterFavoriteIcon from "@material-ui/icons/Star";
import FilterAllIcon from "@material-ui/icons/IndeterminateCheckBox";
import FilterUnreadIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import MarkAllAsReadIcon from "@material-ui/icons/LibraryAddCheck";
import MarkAllNonClusterAsReadIcon from "@material-ui/icons/PlaylistAddCheck";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import topMenuStyle from "./topMenuStyle";



export const TopMenu = ({
  isFeedListOpen=true,
  isEditPanelOpen=true,
  isFilteringOnAll=true,
  isFilteringOnLiked=true,
  isMenuButtonHidden=true,
}:any) => {
  const theme = useTheme();
  const classes = topMenuStyle();
  const burgered = !useMediaQuery(theme.breakpoints.up("md"));
  const isShifted = (isFeedListOpen === null ? !burgered : isFeedListOpen) && isEditPanelOpen;
  // menu on smal display
  const [anchorEl, setAnchorEl] = useState(null);
  const showMenu = Boolean(anchorEl);
  const handleClick = (e:any) => setAnchorEl(e.currentTarget);

  // iter through commands on top menu
  const commandsDefs = {
    unread: { label: (!isFilteringOnAll
                      ? "Show all"
                      : "Show unread articles"),
              onClick: () => {},
              icon: (!isFilteringOnAll
                     ? <FilterUnreadIcon />
                     : <FilterAllIcon />)},
    liked: { label: (isFilteringOnLiked
                     ? "Show all"
                     : "Show liked articles"),
             onClick: () => {},
             icon: (isFilteringOnLiked
                    ? <FilterFavoriteIcon />
                    : <FilterAllOrFavoriteIcon />
             ), },
    mark: { label: "Mark all as read",
            onClick: () => {},
            icon: <MarkAllAsReadIcon /> },
    markNC: { label: "Mark all non cluster as read",
              onClick: () => {},
              icon: <MarkAllNonClusterAsReadIcon /> },
  };

  const commands = Object.entries(commandsDefs).map(([key, command]) => {
      if (burgered) {
        return (
          <MenuItem
            onClick={(e) => {
                    setAnchorEl(null);
                    command.onClick();
                }}
           key={'command-'+key}
          >
            <ListItemIcon>
              <IconButton edge="start" color="inherit"
                className={classes.menuButton}>
                {command.icon}
              </IconButton>
            </ListItemIcon>
            <Typography>{command.label}</Typography>
          </MenuItem>);
      }
      return (
        <Tooltip 
          title={command.label}
          key={'command-'+key}
        >
          <IconButton color="inherit"
            onClick={command.onClick} className={classes.menuButton}
          >
            {command.icon}
          </IconButton>
        </Tooltip>
      );
    }
  );

  const showFeedList = (
    <Tooltip title="Show feed list">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>{}}
        edge="start"
        className={clsx(classes.menuButton,
                        isMenuButtonHidden && classes.hide)}>
        <MenuIcon />
      </IconButton>
    </Tooltip>
  );

  let menu;  // constructing menu depending on the display size
  if (burgered) {
    const openMenuIcon = (<IconButton
          color="inherit"
          onClick={handleClick}
        >
         {showMenu ?  <MoreVertIcon /> : <MoreHorizIcon />}
        </IconButton>);

    menu = (
      <div>
        {showFeedList}
        {openMenuIcon}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={showMenu}
          onClose={() => setAnchorEl(null)}
          className={classes.burgeredMenu}
        >
          {commands}
        </Menu>
      </div>
    );
  } else {
    menu = (
      <div>
        {showFeedList}
        {commands}
      </div>
    );
  }

  const className = clsx(classes.appBar, {
    [classes.appBarShift]: isShifted,
  });
  return (
    <AppBar position="fixed" className={className}>
      <Toolbar className={clsx(classes.toolbar)}>
        {menu}
        <Typography>JARR</Typography>
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
