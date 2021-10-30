import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const feedListWidth = 300;

export default makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: feedListWidth,
      [theme.breakpoints.down("sm")]: {
        width: "auto"
      },
      flexShrink: 0,
    },
    drawerPaper: {
      width: feedListWidth,
      paddingTop: 64,
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      },
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "space-between",
    },
  }),
);
