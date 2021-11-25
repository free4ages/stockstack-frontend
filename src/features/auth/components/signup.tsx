import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import useStyles from './style';

import {doSignUp} from 'hooks/auth';

function validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

interface IFormFields {
  name?: string;
  email?: string;
  password?: string;
  passwordConf?: string;
}
interface OwnProps{
  setActive: (value:string) => void;
}

const mapState = (state: RootState) => ({
  isLoading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatch = (dispatch:AppDispatch) => ({
  signUp(formData:IFormFields) {
    dispatch(doSignUp({
      email:formData.email || "", 
      password:formData.password || "",
      name: formData.name || ""
    }));
  },
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;



const SignUp = ({ 
  isLoading, 
  error, 
  signUp,
  setActive,
}:Props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState<IFormFields>({ name: "", password: "",
                                             passwordConf: "", email: "",
  });
  const [errors,setErrors] = useState<IFormFields>({
    name:"",
    password:"",
    passwordConf:"",
    email:"",
  })
  const [pwdType, setPwdType] = useState("password");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const errors:IFormFields = {};
    if(!formData.password){
      errors.password = "Invalid Password";
    }
    if(formData.password!==formData.passwordConf){
      errors.passwordConf='Password Dont match';
    }
    if(!formData.name || !(formData.name.length>2)){
      errors.name = 'Invalid Name';
    }
    if(!formData.email || !validateEmail(formData.email)){
      errors.email = "Invalid Email";
    }
    if(Object.keys(errors).length){
      setErrors(errors);
      return;
    }
    setErrors(errors);
    signUp(formData);
  }


  return (
    <div style={{width:'100%'}}>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid item>
        <TextField required label="Name"
          className={classes.loginInput}
          disabled={isLoading}
          error={!!errors.name}
          helperText={errors.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Grid>
      <Grid item>
        <TextField required label="Email"
          className={classes.loginInput}
          disabled={isLoading}
          error={!!errors.email}
          helperText={errors.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Grid>
      <Grid item>
        <TextField required label="Password" type={pwdType}
          className={classes.loginInput}
          disabled={isLoading} error={!!errors.password}
          helperText={errors.password || ""}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </Grid>
      <Grid item>
        <TextField required label="Confirm Password" type={pwdType}
          className={classes.loginInput}
          disabled={isLoading} error={!!errors.passwordConf}
          helperText={errors.passwordConf || ""}
          onChange={(e) => setFormData({ ...formData, passwordConf: e.target.value })}
        />
      </Grid>
      {error && (
        <Grid item>
          <span style={{color:'red'}}>{error}</span>
        </Grid>
      )}
      <Grid item className={classes.loginButton}>
        <Button variant="contained" type="submit" color="primary">
          Sign Up
        </Button>
      </Grid>
      <Grid item className={classes.signupButton}>
        <span>Already have an account ?</span>
        <span className={classes.signupLink} onClick={(e) => {setActive('login')}}>Login</span>
      </Grid>
    </form>
    </div>
  );
}
export default connector(SignUp);
