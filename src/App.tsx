import React, {useEffect, useState} from 'react';
import { Redirect,Route, Switch, useHistory, useLocation,Router} from "react-router-dom";
import {useAppSelector} from 'app/hooks';
import { ThemeProvider } from "@material-ui/styles";
//import {DetectAppIcon} from '@lipihipi/ec-student-web';
//import './app.scss';
//import '@lipihipi/theme';
//import config from './config'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {defaultTheme} from './theme';
import BackendAPI from './services';
import {history} from 'app/history';



import routes from "./routes";
import AuthAPI from "./services/auth";


BackendAPI.setENV('dev');


function App() {
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map((props) => {
            const { route, routeProps} = props;

            return (
              <Route key={route} path={route} {...routeProps}>
                <CustomRender route={props}/>
                <ToastContainer/>
              </Route>
            )
          })
        }
      </Switch>
    </Router>
  );
}


const CustomRender = ({route: routeOptions}: { route: any }) => {
  const {
    component: Component,
    layout: Layout,
    route, 
    resource, 
    theme,
    props: componentProps, 
    isProtected 
  } = routeOptions;
  const user = useAppSelector((state:any) =>{ return state.auth.user});
  const loginRequired = isProtected && !user;
  const history = useHistory();
  const location = useLocation();  

  const pathname =  "/auth/login";
  //if(loginRequired) {
  //  history.push(pathname);
  //}
  return loginRequired ? (
     <Redirect
       to={{
         pathname: pathname,
         state: {from: route, push: true}
       }}
     />
  ) : (
    Layout ? (
      <ThemeProvider theme={theme || defaultTheme}>
        <Layout>
          <Component {...componentProps}/>
        </Layout>
      </ThemeProvider>
    ) : (
      <ThemeProvider theme={theme || defaultTheme}>
        <Component {...componentProps} />
      </ThemeProvider>
    )
  );
}

export default App;
