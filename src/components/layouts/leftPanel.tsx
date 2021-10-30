import React, { useState } from "react";
import { FixedSizeList } from "react-window";
// components
import { useTheme,withStyles,Theme,createStyles,makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
//import { FixedSizeList } from "react-window";
import Drawer from "@material-ui/core/Drawer";
import LinkIcon from "@material-ui/icons/Link";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";

// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddFeedIcon  from "@material-ui/icons/Add";
import AddCategoryIcon from "@material-ui/icons/LibraryAdd";
import FoldAllCategoriesIcon from "@material-ui/icons/UnfoldLess";
import UnFoldAllCategoriesIcon from "@material-ui/icons/UnfoldMore";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import Close from "@material-ui/icons/Close";

import leftPanelStyle from "./leftPanelStyle";
import feedListStyle from "./feedListStyle";


const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -7,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }),
)(Badge);

const iconStyle = makeStyles((theme: Theme) =>
  createStyles({
    feedIcon: {
      maxWidth: 16,
      maxHeight: 16,
      margin: "8px 5px 8px 20px",
      width: "100%",
      height: "auto",
    }
  }),
);

const FeedRow = ({index,style}:any) => {
  const classes = feedListStyle();
  const iconClasses = iconStyle();
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
  //if (displaySearch) {
    searchBar = (
      <div className={classes.drawerHeader}>
        <InputBase placeholder="Search feed…" autoFocus
          onChange={(e) => console.log(e.target.value)} />
        <IconButton onClick={() => { setDisplaySearch(false);} }>
          <Close />
        </IconButton>
      </div>
    );
  //}


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
      {/*<div className={classes.drawerHeader}>
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
      {displaySearch ? <Divider /> : null } */}
      {/*{searchBar}*/}
      <Divider />
      <Tabs value={0} variant="fullWidth">
        <Tab label={<StyledBadge badgeContent={100} color="secondary"> Topics </StyledBadge>} classes={{root:classes.tab}}/>
        <Tab label="Pinned (100)" classes={{root:classes.tab}}/>
        <Tab icon={<SearchIcon/>} aria-label="Item Three" classes={{root:classes.tabSearch}}/>
      </Tabs>
        <FixedSizeList height={1000} width={299} itemCount={500} itemSize={34}>
        {FeedRow}
      </FixedSizeList>
      {/*{list}*/}
    </Drawer>
  );
};
