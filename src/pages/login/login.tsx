import React from 'react';
import {useHistory} from 'react-router-dom';
import {useLocation} from "react-router-dom";

import BackendAPI from 'services'
import AuthAPI from 'services/auth';
import {Login} from 'components/login';


const LoginPage = () => {
  const history = useHistory();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const redirectUrl = query.get('url');
  const handleAfterLogin = (token: string) => {
    localStorage.setItem('token', token);
    AuthAPI.isAuthenticated = true;
    //BackendAPI.setToken(token);
    AuthAPI.setCurrentUser().then((currentUser:any) => {
      console.log(currentUser);

      if (AuthAPI.isLoggedIn()) {
        history.push(redirectUrl || AuthAPI.getRedirectUrl(AuthAPI.getCurrentUser()));
      }
    });
  };

  return <Login
    login={BackendAPI.auth.login}
    setToken={handleAfterLogin}
  />
};

export default LoginPage;
