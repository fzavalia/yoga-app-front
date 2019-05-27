import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes/routes";
import Layout from "./Layout";
import Button from "../components/Button";
import helpers from "../helpers";

const Admin: Layout = (props: { children: any }) => (
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
                selected={window.location.pathname.startsWith(route.path)}
              >
                {route.name}
              </Button>
            </Link>
          ))}
      </HeaderLinksContainer>
    </Header>
    <ContentContainer>
      <Content>{props.children}</Content>
    </ContentContainer>
  </>
);

const Header = (props: { children: any }) => (
  <header
    style={{
      width: "100%",
      backgroundColor: helpers.color.secondary,
      height: 90,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 0 5px black"
    }}
  >
    {props.children}
  </header>
);

const HeaderLinksContainer = (props: { children: any }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "500px",
      margin: "0 1rem"
    }}
  >
    {props.children}
  </div>
);

const ContentContainer = (props: { children: any }) => (
  <section
    style={{
      height: "calc(100vh - 90px)",
      overflowY: "auto",
      display: "flex",
      justifyContent: "center"
    }}
  >
    {props.children}
  </section>
);

const Content = (props: { children: any }) => (
  <div
    style={{
      width: "100%",
      maxWidth: "500px",
      margin: "1rem"
    }}
  >
    {props.children}
  </div>
);

export default Admin;
