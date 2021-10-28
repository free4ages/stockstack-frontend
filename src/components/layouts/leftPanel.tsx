import React, { useState } from "react";
// components
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
//import { FixedSizeList } from "react-window";
import Drawer from "@material-ui/core/Drawer";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddFeedIcon  from "@material-ui/icons/Add";
import AddCategoryIcon from "@material-ui/icons/LibraryAdd";
import FoldAllCategoriesIcon from "@material-ui/icons/UnfoldLess";
import UnFoldAllCategoriesIcon from "@material-ui/icons/UnfoldMore";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import Close from "@material-ui/icons/Close";

import leftPanelStyle from "./leftPanelStyle";
export const LeftPanel = ({
  isFoldedFromParent = true,
  isFeedListOpen = true,
  isEditPanelOpen = false,
  isLoading = false,
}) => {

  const classes = leftPanelStyle();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isOpen = (isFeedListOpen === null ? isDesktop : isFeedListOpen) && !isEditPanelOpen;

  const [displaySearch, setDisplaySearch] = useState(false);

  let searchBar;
  if (displaySearch) {
    searchBar = (
      <div className={classes.drawerHeader}>
        <InputBase placeholder="Search feed…" autoFocus
          onChange={(e) => console.log(e.target.value)} />
        <IconButton onClick={() => { setDisplaySearch(false);} }>
          <Close />
        </IconButton>
      </div>
    );
  }


  const addFeedButton = (
    <IconButton onClick={() => {}}>
      <AddFeedIcon />
    </IconButton>);

  const addCategoryButton = (
    <IconButton onClick={() => {}}>
      <AddCategoryIcon />
    </IconButton>);
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <div>
          <Tooltip title="Add new feed">{addFeedButton}</Tooltip>
          <Tooltip title="Add new category">{addCategoryButton}</Tooltip>
          <Tooltip title={isFoldedFromParent ? "Unfold categories" : "Fold categories"}>
            <IconButton onClick={()=>{}}>
             {isFoldedFromParent ? <UnFoldAllCategoriesIcon /> : <FoldAllCategoriesIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Search through feed list">
            <IconButton onClick={() => {
              //if(displaySearch) { setSearchFilter(null); }
              setDisplaySearch(!displaySearch);
            }}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Hide feed list">
            <IconButton onClick={()=>{}}>
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {displaySearch ? <Divider /> : null }
      {searchBar}
      <Divider />
      {/*{list}*/}
    </Drawer>
  );
};
