import React, {useEffect,useState} from 'react';
import { Switch, Route } from "react-router-dom";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import useStyles from './components/style';

import {Login} from './components';

const Header = () => {
  const classes = useStyles();
  return (
    <Grid item className={classes.welcome}>
      {/*<img className={classes.jarrIcon} src={jarrIcon} alt="Welcome to JARR!" title="Welcome to JARR!"/>*/}
      <span>StockStack</span>
    </Grid>
  );
}
const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item className={classes.recoverButton}>
        <span onClick={(e) => {}}>Forgotten password ?</span>
      </Grid>
      {/*<Grid item className={classes.googleButton}>
        <form method="get" action={``}>
          <Button variant="contained" type="submit" color="secondary">
            Login with Google
          </Button>
        </form>
      </Grid>*/}
      <Grid item className={classes.signupButton}>
        <span>Don't have an account ?</span>
        <span className={classes.signupLink} onClick={(e) => {}}>Sign up</span>
      </Grid>
    </>
  );

};
interface OwnProps{
  isLoading?: boolean
}

const mapState = (state: RootState) => ({
  //isLoading: state.auth.loading,
});

const mapDispatch = (dispatch:AppDispatch) => ({
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;


const Auth = ({
  isLoading=false
}:Props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.loginContainer} direction="column" >
      <Switch>
        <Route path="/auth/login" exact={false}>
          <>
          {isLoading ? (
             <Grid item><CircularProgress /></Grid> 
          ):(
            <Header />
          )}
          <Login />

          <Footer />
          </>
        </Route>
      </Switch>
    </Grid>
  );
}

export default connector(Auth);
