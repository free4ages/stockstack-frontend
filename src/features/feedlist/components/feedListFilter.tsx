import React,{useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';

import SearchIcon from "@material-ui/icons/Search";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FilterAllIcon from "@material-ui/icons/IndeterminateCheckBox";
import MarkAllAsReadIcon from "@material-ui/icons/LibraryAddCheck";
import FilterFavoriteIcon from "@material-ui/icons/Star";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import RefreshIcon from '@material-ui/icons/Refresh';

import {IFeedFilter} from 'slices/feedSlice';
import SearchBar from 'components/searchBar';
import debounce from 'utils/debounce';

import {doListFeeds,doSearchFeeds,doMarkReadAll} from 'hooks/feed';
import {setReadMode} from 'slices/feedSlice';

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
  },
}));

interface OwnProps{
  searchOpen: boolean;
  setSearchOpen : (v:boolean) => void
}

const mapState = (state: RootState) => ({
  filters: state.feeds.filters,
  readMode: !!state.feeds.readMode,
});


const mapDispatch = (dispatch:AppDispatch) => {
  return {
    changeFilter(filter:IFeedFilter){
      dispatch(doListFeeds({addFilter:filter}));
    },
    search(params:{query:string,all?:boolean}){
      dispatch(doSearchFeeds(params));
    },
    toggleReadMode(value:boolean){
      dispatch(setReadMode(value));
    },
    markAllRead(){
      dispatch(doMarkReadAll());
    },
    refresh(){
      dispatch(doListFeeds());
    }
  }
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const FeedListFilter = ({
  searchOpen,
  setSearchOpen,
  filters,
  changeFilter,
  search,
  readMode,
  toggleReadMode,
  refresh,
  markAllRead,
}:Props) => {
  const classes = useStyles();
  const [searchAll,setSearchAll] = useState(false);

  const handleSearchToggle = (e:any) => {
    if(searchOpen){
      search({query:''});
    }
    setSearchOpen(!searchOpen);
  }
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
            <IconButton className={classes.filterIcon}  onClick={()=>{markAllRead()}}>
              <MarkAllAsReadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton className={classes.filterIcon} onClick={()=>{refresh()}}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={readMode?"Turn Read Mode Off":"Turn Read Mode On"}>
            <IconButton className={clsx(classes.filterIcon)} onClick={()=>{ toggleReadMode(!readMode)}}>
              {readMode?(
                <FiberManualRecordIcon />
              ):(
                <RadioButtonCheckedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton className={classes.filterIcon} onClick={handleSearchToggle}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
      {searchOpen && (
        <SearchBar
          value={filters.q || ""}
          endAdornment={<InputAdornment position="end">
            <Tooltip title="Search All Feed">
              <Checkbox onChange={(e)=> setSearchAll(e.target.checked)} />
            </Tooltip>
          </InputAdornment>}
          onRequestSearch={(value:string) => search({query:value,all:searchAll})}
          onCancelSearch={() => search({query:'',all:false})}
        />
      )}
    </div>
  );
};

export default connector(FeedListFilter);
