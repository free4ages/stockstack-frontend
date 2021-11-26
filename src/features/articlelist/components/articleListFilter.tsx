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
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import {IArticleFilter} from 'slices/articleSlice';
import SearchBar from 'components/searchBar';
import {changedFilter,setSearchText} from 'slices/articleSlice';
import {doSearchArticles} from 'hooks/article';

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
  filters: state.articles.filters,
});

const mapDispatch = (dispatch:AppDispatch) => {
  return {
    changeFilter(filter:IArticleFilter){
      dispatch(changedFilter(filter));
    },
    search(params:{query:string,all?:boolean}){
      dispatch(doSearchArticles(params));
    }
  }
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const ArticleListFilter = ({
  searchOpen,
  setSearchOpen,
  filters,
  changeFilter,
  search
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
        <Typography>Articles{filters.tagName?` > ${filters.tagName}`:``}</Typography>
        <div>
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
            <Tooltip title="Search All Articles">
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

export default connector(ArticleListFilter);

