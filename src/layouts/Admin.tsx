import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import routes from "../routes/routes";
import styled from "styled-components";
import classnames from "classnames";
import Layout from "./Layout";
import Button from "../components/Button";
import helpers from "../helpers";

const Admin: Layout = (props: {
  children: any;
  routeComponentProps: RouteComponentProps;
}) => (
  <>
    <Header>
      <HeaderLinksContainer>
        {routes
          .filter(route => route.isModuleEntrypoint)
          .map((route, key) => (
            <Link key={key} to={route.path}>
              <Button
                colors={{
                  main: helpers.color.primary,
                  selected: helpers.color.primaryLight
                }}
                className={classnames({
                  selected: window.location.pathname.startsWith(route.path)
                })}
              >
                {route.name}
              </Button>
            </Link>
          ))}
      </HeaderLinksContainer>
    </Header>
    <Content>{props.children}</Content>
  </>
);

const Header = styled.header`
  width: 100%;
  background-color: ${helpers.color.secondary};
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px black;
`;

const HeaderLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin: 0 1rem;
  left: 50%;
`;

const Content = styled.section`
  height: calc(100vh - 90px);
  overflow-x: scroll;
  padding: 1rem;
`;

export default Admin;
