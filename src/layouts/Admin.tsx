import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import routes from "../routes";

const Admin: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          {routes
            .filter(route => route.showInHeader)
            .map((route, key) => (
              <Link key={key} to={route.path}>
                <button>{route.name}</button>
              </Link>
            ))}
        </header>
        <section>
          <Switch>
            {routes.map((route, key) => (
              <Route
                exact
                key={key}
                path={route.path}
                component={route.component}
              />
            ))}
            <Redirect from="/" to={routes[0].path} />
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
};

export default Admin;
