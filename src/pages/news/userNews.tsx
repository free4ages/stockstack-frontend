import React,{useState} from 'react';
import clsx from "clsx";
// material components
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Chip from "@material-ui/core/Chip";
import Paper from '@material-ui/core/Paper';
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InputBase from "@material-ui/core/InputBase";

import SettingsIcon from "@material-ui/icons/Settings";
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FilterAllIcon from "@material-ui/icons/IndeterminateCheckBox";
import Close from "@material-ui/icons/Close";
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
  articleContainer:{
    overflowY:'scroll',
    height:'calc(100vh - 144px - 15px)',
    paddingLeft:24,
    paddingRight:24,
    marginTop:5
  },
  articleContainerShifted:{
    height:'calc(100vh - 144px - 15px - 48px)',
  },
  filterBar:{
    paddingLeft:24,
    paddingRight:24
  }
}));
const articleStyles = makeStyles((theme:Theme) => ({
  root: {
    overflow: 'hidden',
    border:'1px solid #dfe1e5',
    borderRadius: 8,
    boxShadow: 'none',
    marginBottom: 16,
    fontWeight:'normal',
    fontFamily:'arial,sans-serif',
    color:'#202124',
    padding:16,
    paddingBottom:10,
  },
  heading:{
    whiteSpace:'normal',
    fontSize:18,
    lineHeight:'1.33em',
    fontFamily:'Roboto-Medium,sans-serif',
  },
  shortText:{
    marginTop:8,
    color:'#70757a',
    fontSize:14,
    lineHeight:1.43,
    whiteSpace:'normal',
  },
  bottomText:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    fontSize:12,
    color:'#70757a',
    lineHeight:1.34,
    marginTop:8,
  },
  timeText:{
    flex:'1 0 auto',
  },
  tagChips:{
    display:'flex',
    alignItems: 'center',
    flex:'1 0 auto',
    '& > *':{
      margin: theme.spacing(0.5),
    }
  },
  chipRoot:{
    color:'#70757a',
    fontSize:12,
  },
  sourceText:{
    textAlign:'right',
  },
  actionButton:{
    marginLeft:5,
    padding:0,
    fontSize:12,
    color:'#e2e6eb',
    '&:hover':{
      backgroundColor:'inherit'
    },
    '& .MuiSvgIcon-root':{
      fontSize:15
    }
  },
  actionButtonActive:{
    color:'#70757a',
  }
}));

const Article = () => {
  const classes = articleStyles();
  return (
    <Paper elevation={0} className={classes.root}>
      <div>
        <div className={classes.heading}>
          CLSA downgrades Tata Power post a stellar run; shares fall almost 8% post Q2 numbers
        </div>
        <div className={classes.shortText}>
          Tata Power fell as much as 8 percent on Friday, a day after the company reported a 36 percent jump in consolidated net profit at Rs 506...
        </div>
        <div className={classes.bottomText}>
          <div className={classes.timeText}>
            <span>7 hours ago  [cnn]</span>
          </div>
          <div className={classes.tagChips}>
            <Chip classes={{root:classes.chipRoot}} variant="outlined" size="small" label="tatapower" />
            <Chip classes={{root:classes.chipRoot}} variant="outlined" size="small" label="ongc" />
            <Chip classes={{root:classes.chipRoot}} variant="outlined" size="small" label="iex" />
            <div className={classes.chipRoot}>
              <span>+2 more</span>
            </div>
          </div>
          <div className={classes.sourceText}>
          <Tooltip title="Mark Important">
            <IconButton classes={{root:classes.actionButton}} onClick={()=>{}}>
              <StarBorderOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Read Later">
            <IconButton classes={{root:classes.actionButton}} onClick={()=>{}}>
              <BookOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark Read">
            <IconButton classes={{root:classes.actionButton}} onClick={()=>{}}>
              <CheckCircleOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open Link">
            <IconButton classes={{root:classes.actionButton}} className={clsx(classes.actionButtonActive)} onClick={()=>{}}>
              <LaunchOutlinedIcon />
            </IconButton>
          </Tooltip>
          </div>
        </div>
      </div>
    </Paper>
  )
}


const UserNewsPage = () => {
  const classes = useStyles();
  const [searchOpen,setSearchOpen] = useState(false);
  return (
  <>
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
    <div className={clsx(classes.articleContainer,{[classes.articleContainerShifted]:searchOpen})}>
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </div>
    </>
  )

};

export default UserNewsPage;

