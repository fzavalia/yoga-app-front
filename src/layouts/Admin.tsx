import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import routes from "../routes";
import styled from "styled-components";
import classnames from "classnames";

const Admin: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {routes.map((route, key) => (
            <Route
              exact
              key={key}
              path={route.path}
              render={props => (
                <RouteComponentWrapper routeComponentProps={props}>
                  {route.component}
                </RouteComponentWrapper>
              )}
            />
          ))}
          <Redirect from="/" to={routes[0].path} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const RouteComponentWrapper = (props: {
  routeComponentProps: RouteComponentProps;
  children: (props: RouteComponentProps) => JSX.Element;
}) => {
  return (
    <>
      <Header>
        <HeaderLinksContainer>
          {routes
            .filter(route => route.showInHeader)
            .map((route, key) => (
              <Link key={key} to={route.path}>
                <HeaderLink
                  className={classnames({
                    selected: window.location.pathname.startsWith(route.path)
                  })}
                >
                  {route.name}
                </HeaderLink>
              </Link>
            ))}
        </HeaderLinksContainer>
      </Header>
      <section>
        <props.children {...props.routeComponentProps} />
      </section>
    </>
  );
};

const Header = styled.header`
  width: 100%;
  background-color: #222;
  height: 90px;
  display: flex;
  align-items: center;
`;

const HeaderLinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto;
  width: 100%;
  max-width: 700px;
  left: 50%;
`;

const HeaderLink = styled.span`
  color: #999;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #111;
  }
  &.selected {
    background-color: #999;
    color: #111;
  }
`;

export default Admin;
