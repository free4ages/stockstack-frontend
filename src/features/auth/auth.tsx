import React, {useEffect,useState} from 'react';
import { Switch, Route } from "react-router-dom";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import useStyles from './components/style';

import {Login,SignUp} from './components';
import {toggleModal} from 'slices/authSlice';

const Header = () => {
  const classes = useStyles();
  return (
    <Grid item className={classes.welcome}>
      {/*<img className={classes.jarrIcon} src={jarrIcon} alt="Welcome to JARR!" title="Welcome to JARR!"/>*/}
      <span>StockStack</span>
    </Grid>
  );
}
interface OwnProps{
}

const mapState = (state: RootState) => ({
});

const mapDispatch = (dispatch:AppDispatch) => ({
  closeModal(){
    dispatch(toggleModal(false));
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;


const Auth = ({
  closeModal,
}:Props) => {
  const classes = useStyles();
  const [active,setActive] = useState('login');
  return (
    <>
    <Grid container className={classes.loginContainer} direction="column" >
          <Header />
          {active === "login" && (
            <Login setActive={setActive}/>
          )}
          {active === "signup" && (
            <SignUp setActive={setActive}/>
          )}
         <IconButton aria-label="Close" className={classes.closeButton} onClick={()=> {closeModal()}}>
          <CloseIcon />
        </IconButton>
    </Grid>
    </>
  );
}

export default connector(Auth);
