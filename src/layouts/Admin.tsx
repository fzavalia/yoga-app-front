import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import routes from "../routes/routes";
import styled from "styled-components";
import classnames from "classnames";
import Layout from "./Layout";
import Button from "../components/Button";

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
              <Button dark
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
    <section>{props.children}</section>
  </>
);

const Header = styled.header`
  width: 100%;
  background-color: var(--color-secondary);
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

export default Admin;
