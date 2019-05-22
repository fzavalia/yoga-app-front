import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import routes from "../routes/routes";
import styled from "styled-components";
import classnames from "classnames";
import Layout from "./Layout";

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
    <section>{props.children}</section>
  </>
);

const Header = styled.header`
  width: 100%;
  background-color: var(--color-dark);
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
  color: var(--color-light);
  border: 1px solid var(--color-light);
  border-radius: 5px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-darker);
  }
  &.selected {
    background-color: var(--color-light);
    color: var(--color-darker);
  }
`;

export default Admin;
