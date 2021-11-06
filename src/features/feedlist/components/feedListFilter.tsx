import React,{useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState} from 'app/store';
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

import {FeedList} from 'components/feeds';
import SearchBar from "material-ui-search-bar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import SearchIcon from "@material-ui/icons/Search";
import FilterAllIcon from "@material-ui/icons/IndeterminateCheckBox";
import MarkAllAsReadIcon from "@material-ui/icons/LibraryAddCheck";
import FilterFavoriteIcon from "@material-ui/icons/Star";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

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
  filterBar:{
    paddingLeft:24,
    paddingRight:24
  },
  filterIcon:{
    padding: 8,
    borderRadius: 0,
  },
  toolEnd:{
    marginRight:30,
  }
}));

interface OwnProps{
  searchOpen: boolean;
  setSearchOpen : (v:boolean) => void
}

const mapState = (state: RootState) => ({
  filters: state.feeds.filters,
});

const mapDispatch = {

};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const FeedListFilter = ({
  searchOpen,
  setSearchOpen,
  filters
}:Props) => {
  const classes = useStyles();
  return (
      <div className={classes.filterBar}>
      <Toolbar className={clsx(classes.toolbar)}>
        <div>
          <Typography>Feeds</Typography>
        </div>
        <div>
          <Tooltip title={filters.showReadLater?"Show All":"Show Read List"}>
            <IconButton className={classes.filterIcon} onClick={()=>{}}>
              {filters.showReadLater?(
                <TurnedInIcon />
              ):(
                <TurnedInNotIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title={filters.showImportant?"Show All":"Show Important"}>
            <IconButton className={classes.filterIcon} onClick={()=>{}}>
              {filters.showImportant?(
                <StarIcon />
              ):(
                <StarBorderOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip  title={filters.showUnread?"Show All":"Show Unread"}>
            <IconButton className={clsx(classes.filterIcon,classes.toolEnd)} >
              {filters.showUnread?(
                <CancelPresentationOutlinedIcon />
              ):(
                <CheckBoxOutlineBlankOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark All As Read">
            <IconButton className={classes.filterIcon}  onClick={()=>{}}>
              <MarkAllAsReadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton className={classes.filterIcon} onClick={()=>{setSearchOpen(!searchOpen)}}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
      {searchOpen && (
        <SearchBar />
      )}
    </div>
  );
};

export default connector(FeedListFilter);

