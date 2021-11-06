import React,{useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

import {FeedList} from 'components/feeds';
import SearchBar from "material-ui-search-bar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from "@material-ui/icons/Search";
import FilterAllIcon from "@material-ui/icons/IndeterminateCheckBox";
import MarkAllAsReadIcon from "@material-ui/icons/LibraryAddCheck";
import FilterFavoriteIcon from "@material-ui/icons/Star";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import RefreshIcon from '@material-ui/icons/Refresh';

import {IFeedFilter} from 'slices/feedSlice';
import {changedFilter} from 'slices/feedSlice';

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
    padding: 5,
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

const mapDispatch = (dispatch:AppDispatch) => ({
  changeFilter(filter:IFeedFilter){
    dispatch(changedFilter(filter));
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const FeedListFilter = ({
  searchOpen,
  setSearchOpen,
  filters,
  changeFilter,
}:Props) => {
  const classes = useStyles();
  return (
      <div className={classes.filterBar}>
      <Toolbar className={clsx(classes.toolbar)}>
        <div>
          <Typography>Feeds{filters.tagName?` > ${filters.tagName}`:``}</Typography>
        </div>
        <div>
          <Tooltip title={filters.showReadLater?"Show All":"Show Read List"}>
            <IconButton 
              className={classes.filterIcon} 
              onClick={()=>{
                changeFilter({showReadLater:!filters.showReadLater})}
              }
            >
              {filters.showReadLater?(
                <TurnedInIcon />
              ):(
                <TurnedInNotIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title={filters.showImportant?"Show All":"Show Important"}>
            <IconButton 
              className={classes.filterIcon} 
              onClick={()=>{
                changeFilter({showImportant:!filters.showImportant})}
              }
            >
              {filters.showImportant?(
                <StarIcon />
              ):(
                <StarBorderOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip  title={filters.hideRead?"Show All":"Hide Read"}>
            <IconButton 
              className={clsx(classes.filterIcon,classes.toolEnd)} 
              onClick={()=>{
                changeFilter({hideRead:!filters.hideRead})}
              }
            >
              {filters.hideRead?(
                <CheckBoxOutlineBlankOutlinedIcon />
              ):(
                <CheckBoxOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark All As Read">
            <IconButton className={classes.filterIcon}  onClick={()=>{}}>
              <MarkAllAsReadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton className={classes.filterIcon} onClick={()=>{}}>
              <RefreshIcon />
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
        <SearchBar 
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
        />
      )}
    </div>
  );
};

export default connector(FeedListFilter);

