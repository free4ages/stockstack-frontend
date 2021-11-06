import React,{useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState} from 'app/store';
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

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
  }
}));

interface OwnProps{
  searchOpen: boolean;
  setSearchOpen : (v:boolean) => void
}

const mapState = (state: RootState) => ({
});

const mapDispatch = {

};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const ArticleListFilter = ({
  searchOpen,
  setSearchOpen
}:Props) => {
  const classes = useStyles();
  return (
      <div className={classes.filterBar}>
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
            <IconButton color="inherit" onClick={()=>{setSearchOpen(!searchOpen)}}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Hide feed list">
            <IconButton onClick={()=>{}}>
              <ChevronRightIcon />
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

export default connector(ArticleListFilter);

