import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../modules/redux/reducers";
import { Route as AppRoute } from "./routes";

function Router(props: { routes: AppRoute[] }) {
  return (
    <BrowserRouter>
      <Switch>
        {props.routes.map((route, key) => (
          <Route
            exact
            key={key}
            path={route.path}
            render={props => (
              <route.layout>
                <route.component {...props} />
              </route.layout>
            )}
          />
        ))}
        <Redirect from="/" to={props.routes[0].path} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect((state: AppState) => ({
  routes: state.auth.routes
}))(Router);
