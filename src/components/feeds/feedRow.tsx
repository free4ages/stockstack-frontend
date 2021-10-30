import React from 'react';
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';


const useStyles = makeStyles((theme:Theme) => ({
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

const FeedRow = () => {
  const classes = useStyles();
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
};

export default FeedRow;
