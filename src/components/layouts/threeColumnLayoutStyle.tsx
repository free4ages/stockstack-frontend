import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme:Theme) => ({
  root: {
    display: "flex",
  },
  appContent: {
    //flex: "1 1 100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    maxWidth: "100%", // https://github.com/philipwalton/flexbugs#flexbug-17
    position:'relative',
    paddingTop: 80, // equal to AppBar height + 16px
    //margin: "0 auto",
    //backgroundColor:'#000',
    // Set the max content width for each breakpoint
    // Content will be centered in the space to the right/left of drawer
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg
    }
  },

}));

