import React from 'react';
import { Redirect } from "react-router-dom";
import AuthAPI from "./services/auth";
import {LoginPage} from "./pages/login";
import {UserNewsPage} from "./pages/news";
import layouts from 'components/layouts';
const routes = [
  {
    component: () => {
      const currentUser = AuthAPI.getCurrentUser();
      return <Redirect to={AuthAPI.getRedirectUrl(currentUser)} />;
    },
    route: "/",
    routeProps: { exact: true },
    props: {},
  },
  {
    component: LoginPage,
    route: "/login",
    routeProps: { exact: true },
    props: {},
  },
  {
    component: UserNewsPage,
    route: "/user-news",
    routeProps: { exact: true },
    props: {},
    layout:layouts.ThreeColumnLayout,
    isProtected: true,
  },
]
export default routes;
