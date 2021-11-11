import { makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>({
  feedIcon: {
    maxWidth: 16,
    maxHeight: 16,
    margin: "8px 5px 8px 20px",
    width: "100%",
    height: "auto",
  },
  feedItem: {
    lineHeight: 1,
    overflow: "hidden",
    paddingLeft: "10px !important",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 14,
      paddingLeft: "10px !important",
    }
  },
  feedItemText: {
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      marginRight: 25,
    },
    "& span" : {
      maxWidth: "100%",
      overflow: "hidden",
    }
  },
  feedItemToolBar:{
    position:'absolute',
    right:0,
    top:0,
    marginRight:40,
    '& .MuiIconButton-root:hover':{
      backgroundColor:'inherit'
    }
  },
  feedBadge: {
    opacity: 0.6,
    right: 2
  },
  feed: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  searchRow: {
    paddingTop:2,
    paddingBottom:2
  }
}));

export default useStyles;
