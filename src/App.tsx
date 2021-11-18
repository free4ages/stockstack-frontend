import React from 'react';
import { Redirect,Route, Switch,Router} from "react-router-dom";
import {useAppSelector} from 'app/hooks';
import { ThemeProvider } from "@material-ui/styles";
//import {DetectAppIcon} from '@lipihipi/ec-student-web';
//import './app.scss';
//import '@lipihipi/theme';
//import config from './config'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {defaultTheme} from './theme';
import {history} from 'app/history';
import WebSocketProvider from 'components/webSocketProvider';
import ThreeColumnLayout from 'features/layouts/threeColumnLayout';
import {ArticleList} from './features/articlelist';

import routes,{RenderRoutes} from "./routes";

//https://www.ryanjyost.com/react-routing/
function App() {
  return (
    <WebSocketProvider>
      <Router history={history}>
        <ThemeProvider theme={defaultTheme}>
          <ThreeColumnLayout>
            <RenderRoutes routes={routes}/>
          </ThreeColumnLayout>
        </ThemeProvider>
      </Router>
    </WebSocketProvider>
  );
}


//const CustomRender = ({route: routeOptions}: { route: any }) => {
//  const {
//    component: Component,
//    layout: Layout,
//    route, 
//    theme,
//    props: componentProps, 
//    isProtected 
//  } = routeOptions;
//  const user = useAppSelector((state:any) =>{ return state.auth.user});
//  const loginRequired = isProtected && !user;
//
//  const pathname =  "/auth/login";
//  //if(loginRequired) {
//  //  history.push(pathname);
//  //}
//  return loginRequired ? (
//     <Redirect
//       to={{
//         pathname: pathname,
//         state: {from: route, push: true}
//       }}
//     />
//  ) : (
//    Layout ? (
//      <ThemeProvider theme={theme || defaultTheme}>
//        <Layout>
//          <Component {...componentProps}/>
//        </Layout>
//      </ThemeProvider>
//    ) : (
//      <ThemeProvider theme={theme || defaultTheme}>
//        <Component {...componentProps} />
//      </ThemeProvider>
//    )
//  );
//}

export default App;
