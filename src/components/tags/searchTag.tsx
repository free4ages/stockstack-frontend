import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";

import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
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

const SearchTag = () => {
  const classes = useStyles();
  return (
    <div className={classes.drawerHeader}>
      <InputBase placeholder="Search feed…" autoFocus
        onChange={(e) => console.log(e.target.value)} />
      <IconButton onClick={() => {} }>
        <Close />
      </IconButton>
    </div>
  );
};
