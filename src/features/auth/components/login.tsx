import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import useStyles from './style';

import {doLogin} from 'hooks/auth';

interface OwnProps{
}

const mapState = (state: RootState) => ({
  isLoading: state.auth.loading,
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
  isLoading
}:Props)=> {
  console.log("Rendering Login");
  //const isLoading=false;
  const classes = useStyles();
  return (
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
      <Grid item className={classes.loginButton}>
        <Button variant="contained" type="submit" color="primary">
          Login
        </Button>
      </Grid>
    </form>
  );
};

export default connector(Login);
