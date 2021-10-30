import React,{useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./threeColumnLayoutStyle";
import {TogglePanelButton} from './togglePanelButton';
import {TagWatcher} from '../tags';

import {TopMenu} from './topMenu';
import {RightPanel} from "./rightPanel";
import {LeftPanel} from "./leftPanel";

const ThreeColumnLayout = ({
  children,
}:{
  children: React.ReactNode;
})=>{
  const classes = useStyles();
  const [leftIsOpen,setLeftIsOpen] = useState(true);
  const [rightIsOpen,setRightIsOpen] = useState(true);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopMenu />
      <LeftPanel>
        <TagWatcher />
      </LeftPanel>
      <main className={classes.appContent}>
        <TogglePanelButton isOpen={leftIsOpen} position={"left"} setIsOpen={setLeftIsOpen} />
        <TogglePanelButton isOpen={rightIsOpen} position={"right"} setIsOpen={setRightIsOpen} />
        {children}
      </main>
      <RightPanel />
    </div>
  );
};

export default ThreeColumnLayout;
