import React, { useState } from "react";
import clsx from "clsx"
import { makeStyles, Theme, withStyles, createStyles } from "@material-ui/core/styles";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from "@material-ui/core/Badge";

import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";

import SubscribedTagList from './subscribedTagList';

const useStyles = makeStyles((theme: Theme) =>({
  tab:{
    minWidth: 125,
    //borderRight:"1px solid black",
    borderBottom:"1px solid black" 
  },
  tabSearch:{
    minWidth: 50,
    borderBottom:"1px solid black" 
  },
  hide:{
    display: 'none'
  }
}));

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

const TagWatcher = ()=>{
  const classes = useStyles();
  const [displaySearch,setDisplaySearch] = useState(false);
  const [selectedTab,setSelectedTab] = useState<number>(0)

  const handleChange = (e:any,value:number) => {
    setSelectedTab(value);
    console.log(value);
    if(value==2){
      setDisplaySearch(true);
    }
  }
  return (
    <>
      <Tabs value={selectedTab} variant="fullWidth" className={clsx({[classes.hide]:displaySearch})} onChange={handleChange}>
        <Tab label={<StyledBadge badgeContent={100} color="secondary"> Topics </StyledBadge>} classes={{root:classes.tab}}/>
        <Tab label="Pinned (100)" classes={{root:classes.tab}}/>
        <Tab icon={<SearchIcon/>} aria-label="Item Three" classes={{root:classes.tabSearch}}/>
      </Tabs>
      <Divider />
      <SubscribedTagList />
    </>
  );
};

export default TagWatcher;
