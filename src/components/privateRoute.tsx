import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {storageGet} from 'utils/storage';

const PrivateRoute = ({component: Component, ...rest}:any) => {
  const isLogged = !!storageGet('token',"session");  
  return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page

      <Route {...rest} render={props => (
          isLogged ?
              <Component {...props} />
          : <Redirect to="/articles" />
      )} />
  );
};

export default PrivateRoute;
