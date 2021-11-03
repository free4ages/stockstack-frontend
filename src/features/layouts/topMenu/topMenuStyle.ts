import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
//import { feedListWidth } from "../../const";

export default makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
      justifyContent: "space-between",
    },
    logoutButton: {
      marginRight: -15
    }
  }),
);

