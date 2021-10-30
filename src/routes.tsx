import React from 'react';
import { Redirect } from "react-router-dom";
import AuthAPI from "./services/auth";
import {LoginPage} from "./pages/login";
import {FeedPage} from "./pages/feed";
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
    component: FeedPage,
    route: "/feed",
    routeProps: { exact: true },
    props: {},
    layout:layouts.ThreeColumnLayout,
    isProtected: true,
  },
]
export default routes;
