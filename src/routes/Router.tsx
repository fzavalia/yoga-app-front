import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes/routes";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, key) => (
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
        <Redirect from="/" to={routes[0].path} />
      </Switch>
    </BrowserRouter>
  );
};
