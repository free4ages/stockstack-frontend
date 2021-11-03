import React from "react";
import Drawer from "@material-ui/core/Drawer";

import useStyles from "./leftPanelStyle";

const LeftPanel = ({
  children,
  isOpen=true,
}:{
  children: React.ReactNode;
  isOpen?: boolean
}) => {
  const classes = useStyles();
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
      {children}
    </Drawer>
  );
};

export default LeftPanel;
