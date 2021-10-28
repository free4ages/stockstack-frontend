import React, {useEffect, useState} from 'react';
import { Route, Router, Switch, useHistory, useLocation} from "react-router-dom";
import {createBrowserHistory} from "history";
import { ThemeProvider } from "@material-ui/styles";
//import {DetectAppIcon} from '@lipihipi/ec-student-web';
//import './app.scss';
//import '@lipihipi/theme';
//import config from './config'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {defaultTheme} from './theme';


import routes from "./routes";
import AuthAPI from "./services/auth";

const history = createBrowserHistory();


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

const validateResourceAccess = (resource: string, history: any) => {
  if (!resource) {
    return;
  }
  if (!AuthAPI.hasResourceGrant(resource)) {
    history.push('/dashboard');
  }
};

const CustomRender = ({route: routeOptions}: { route: any }) => {
  const {
    component: Component,
    layout: Layout,
    //route, 
    resource, 
    theme,
    props: componentProps, 
    isProtected 
  } = routeOptions;
  const [isLoading, setLoading] = useState(true);
  const loginRequired = isProtected && !AuthAPI.isLoggedIn();
  const history = useHistory();
  const location = useLocation();  


//  const handleRedirection = () => {
//    console.log('pathname', location.pathname);
//    if(location.pathname.indexOf("/course/wall") > -1 ) {
//      console.log("WALL");
//      history.push("/course/wall");
//    }
//    if(location.pathname.indexOf("/course/batch") > -1  || location.pathname.indexOf("/course/mentorDetails") > -1) {
//      console.log("BATCH");
//      history.push("/course/batch");
//    }
//    if(location.pathname.indexOf("/course/doubt") > -1) {
//      console.log("DOUBT");
//      history.push("/course/doubt");
//    }
//    if(location.pathname.indexOf("/course/tests") > -1) {
//      console.log("TEST");
//      history.push("/course/tests");
//    }
//    if(location.pathname.indexOf("/course/interviews") > -1) {
//      console.log("INTERVIEWS");
//      history.push("/course/interviews");
//    }
//
//  }


  useEffect(() => {
    if (isProtected && AuthAPI.isLoggedIn() && !AuthAPI.getCurrentUser()) {
      AuthAPI.setCurrentUser()
        .then(() => {
          setLoading(false);
          validateResourceAccess(resource, history);
        })
        .catch(() => {
          const pathname =  location.pathname  ? "/login?url="+location.pathname : "/login"
          history.push(pathname);
          // history.push('/logout');
        });
    } else {
      setLoading(false);
      validateResourceAccess(resource, history);
    }
  }, []);


  const pathname =  location.pathname  ? "/login?url="+location.pathname : "/login"
  if(loginRequired) {
    history.push(pathname);
  }
  return isLoading ? null : (loginRequired ? (
<>
    {/* {history.push(pathname)} */}
    </>
    // <Redirect
    //   to={{
    //     pathname: location.pathname  ? "/login?url="+location.pathname : "/login",
    //     state: {from: route, push: true}
    //   }}
    // />
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
  ));
}

export default App;
