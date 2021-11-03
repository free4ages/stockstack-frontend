import React from "react";


import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

import rightPanelStyle from "./rightPanelStyle";

export const RightPanel = ({
  isOpen = true,
  close = () => {}

}:any) => {
  const classes = rightPanelStyle();
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isOpen}
      className={classes.editPanel}
      classes={{
        paper: classes.editPanelPaper,
      }}
    >
      <div className={classes.editPanelHeaderSticky}>
        <div className={classes.editPanelHeader}>
          <IconButton onClick={close}>
            <Close />
          </IconButton>
          <Typography className={classes.editPanelTitle}>
            Test Title
          </Typography>
        </div>
      </div>
      <Divider />
      <div className={classes.editPanelForm}>
        <h1> Hre comes Form</h1>
      </div>
    </Drawer>
  );
};
