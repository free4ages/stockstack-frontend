import React from 'react';
import { Redirect,Route,Switch } from "react-router-dom";
import PrivateRoute from 'components/privateRoute';
import {ArticleList} from './features/articlelist';
import {FeedList} from './features/feedlist';
//import layouts from 'features/layouts';
import {useAppSelector} from 'app/hooks';
const RootComponent = () => {
  const user = useAppSelector((state:any) =>{ return state.auth.user});
  const path = !!user? '/feeds':'/articles';
  return <Redirect to={path} />;
}

export function RenderRoutes({ routes }:any) {
  return (
    <Switch>
      {routes.map((route:any) => {
        return route.isProtected?(
          <PrivateRoute 
            key={route.route}
            path={route.route} 
            component={route.component}
            {...route.routeProps} 
          />

        ):(
          <Route 
            key={route.route}
            path={route.route} 
            render = {props => <route.component {...props} />}
            {...route.routeProps} 
          />
        )
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

const routes = [
  {
    component: RootComponent,
    route: "/",
    routeProps: { exact: true },
    props: {},
  },
  {
    component: ArticleList,
    route: "/articles",
    routeProps: { exact: true },
    props: {},
    //layout:layouts.ThreeColumnLayout,
    isProtected: false,
  },
  {
    component: FeedList,
    route: "/feeds",
    routeProps: { exact: true },
    props: {},
    //layout:layouts.ThreeColumnLayout,
    isProtected: true,
  },
]
export default routes;
