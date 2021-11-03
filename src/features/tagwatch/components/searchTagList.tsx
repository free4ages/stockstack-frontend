import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import SearchTagRow from './searchTagRow';

import { makeStyles, Theme } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";

import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  }
}));

interface OwnProps{
  exitSearch: () => void;
}

const mapState = (state: RootState) => ({
});

const mapDispatch = (dispatch:AppDispatch) => ({
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const SearchTagList = ({
  exitSearch,
}:Props)=>{
  const classes = useStyles();
  return (
    <div className={classes.drawerHeader}>
      <InputBase placeholder="Search feed…" autoFocus
        onChange={(e) => console.log(e.target.value)} />
      <IconButton onClick={() => exitSearch() }>
        <Close />
      </IconButton>
    </div>
  );
}
export default connector(SearchTagList);


