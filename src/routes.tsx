import React from 'react';
import { Redirect } from "react-router-dom";
import AuthAPI from "./services/auth";
import {LoginPage} from "./pages/login";
import {ArticleList} from './features/articlelist';
import {FeedList} from './features/feedlist';
import {Auth} from './features/auth';
import layouts from 'features/layouts';
import {useAppSelector} from 'app/hooks';
const RootComponent = () => {
  const user = useAppSelector((state:any) =>{ return state.auth.user});
  const path = !!user? '/feeds':'/articles';
  return <Redirect to={path} />;
}
const routes = [
  {
    component: RootComponent,
    route: "/",
    routeProps: { exact: true },
    props: {},
  },
  {
    component: Auth,
    route: "/auth",
    routeProps: {},
    props: {},
  },
  {
    component: ArticleList,
    route: "/articles",
    routeProps: { exact: true },
    props: {},
    layout:layouts.ThreeColumnLayout,
    isProtected: false,
  },
  {
    component: FeedList,
    route: "/feeds",
    routeProps: { exact: true },
    props: {},
    layout:layouts.ThreeColumnLayout,
    isProtected: true,
  },
]
export default routes;
