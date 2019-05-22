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
