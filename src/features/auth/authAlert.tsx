import React from 'react';
import {RootState,AppDispatch} from 'app/store';
import { ConnectedProps,connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {resetAlert as doResetAlert} from 'slices/authSlice';


const useStyles = makeStyles((theme: Theme) => ({
  alertRoot: {
    backgroundColor: '#5f9ea0',
  },
}));


function Alert(props: AlertProps) {
  const classes = useStyles();
  return <MuiAlert classes={{root:classes.alertRoot}} elevation={6} variant="filled" {...props} />;
}

interface OwnProps{
}
const mapState = (state: RootState) => ({
  alertInfo: state.auth.authAlert
});

const mapDispatch = (dispatch:AppDispatch) => ({
  resetAlert(){
    dispatch(doResetAlert());
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const AuthAlert = ({
  alertInfo,
  resetAlert,
}:Props)=> {

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    resetAlert();
  };
  return (
    <Snackbar open={!!alertInfo} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertInfo?.type || "info"}>
        {alertInfo?.message || "Unknown Message"}
      </Alert>
    </Snackbar>
  );
}

export default connector(AuthAlert);
