import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import useStyles from './style';

import {doLogin} from 'hooks/auth';

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      {/*<Grid item className={classes.recoverButton}>
        <span onClick={(e) => {}}>Forgotten password ?</span>
      </Grid>*/}
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
  setActive: (value:string) => void;
}

const mapState = (state: RootState) => ({
  isLoading: state.auth.loading,
  error: state.auth.error
});

const mapDispatch = (dispatch:AppDispatch) => ({
  logIn(e:any) {
    e.preventDefault();
    const email = e.target.querySelector("input#ss-email").value;
    const password = e.target.querySelector("input#ss-password").value;
    dispatch(doLogin({email, password}));
  },
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Login = ({
  logIn,
  isLoading,
  setActive,
  error
}:Props)=> {
  console.log("Rendering Login");
  //const isLoading=false;
  const classes = useStyles();
  return (
    <>
    <form onSubmit={logIn} className={classes.loginForm}>
      <Grid item>
        <TextField required id="ss-email" label="Email"
          className={classes.loginInput}
          disabled={isLoading}
          //error={!!loginError}
          //helperText={loginError}
        />
      </Grid>
      <Grid item>
        <TextField required id="ss-password" label="Password" type="password"
          className={classes.loginInput}
          disabled={isLoading}
          //disabled={false}
          //error={!!passwordError}
          //helperText={passwordError}
        />
      </Grid>
      {error && (
        <Grid item>
          <span style={{color:'red'}}>{error}</span>
        </Grid>
      )}
      <Grid item className={classes.loginButton}>
        <Button variant="contained" type="submit" color="primary">
          Login
        </Button>
      </Grid>
      <Grid item className={classes.signupButton}>
        <span>Don't have an account ?</span>
        <span className={classes.signupLink} onClick={(e) => {setActive('signup')}}>Sign up</span>
      </Grid>
    </form>
    </>
  );
};

export default connector(Login);
