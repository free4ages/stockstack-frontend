import React, {useEffect,useState} from 'react';
import clsx from "clsx"
import { makeStyles, Theme, withStyles, createStyles } from "@material-ui/core/styles";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from "@material-ui/core/Badge";

import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";

import {SubscribedTagList,PinnedTagList,SearchTagList} from './components';

const useStyles = makeStyles((theme: Theme) =>({
  tab:{
    minWidth: 250,
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

interface OwnProps{
}
const mapState = (state: RootState) => ({
});

const mapDispatch = (dispatch:AppDispatch) => ({
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const TagWatch = React.memo(({
}:Props) => {
  const classes = useStyles();
  const [displaySearch,setDisplaySearch] = useState(false);
  const [selectedTab,setSelectedTab] = useState<number>(0)

  const handleChange = (e:any,value:number) => {
    if(value === 1){
      setDisplaySearch(true);
    }
    else{
      setSelectedTab(value);
    }
  }
  const handleSearchClose = () => {
    setDisplaySearch(false);
  }
  return (
    <>
      <Tabs 
        value={selectedTab} 
        variant="fullWidth" 
        className={clsx({[classes.hide]:displaySearch})} 
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
      >
        {/*<Tab label={<StyledBadge badgeContent={100} color="secondary"> Topics </StyledBadge>} classes={{root:classes.tab}}/>*/}
        <Tab label={"Topics"} classes={{root:classes.tab}}/>
        {/*<Tab label="Pinned (100)" classes={{root:classes.tab}}/>*/}
        <Tab icon={<SearchIcon/>} aria-label="Item Three" classes={{root:classes.tabSearch}}/>
      </Tabs>
      <Divider />
      <SubscribedTagList show={(selectedTab === 0 && !displaySearch)}/>
      {/*{selectedTab === 1 && !displaySearch && (
        <PinnedTagList />
      )}*/}
      {displaySearch &&
        <SearchTagList exitSearch={handleSearchClose} />
      }
    </>
  );
});
export default connector(TagWatch);
