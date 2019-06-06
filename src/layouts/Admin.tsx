import React from "react";
import { Link } from "react-router-dom";
import { Route } from "../routes/routes";
import Layout from "./Layout";
import Button from "../components/Button";
import helpers from "../helpers";
import Paper from "../components/Paper";
import { connect } from "react-redux";
import { AppState } from "../modules/redux/reducers";

const Admin: Layout = (props: { children: React.ReactNode }) => (
  <ConnectedAdminContainer>{props.children}</ConnectedAdminContainer>
);

const AdminContainer = (props: {
  children: React.ReactNode;
  routes: Route[];
}) => (
  <>
    <Header>
      {props.routes
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
    </Header>
    <Content>{props.children}</Content>
  </>
);

const ConnectedAdminContainer = connect((state: AppState) => ({
  routes: state.auth.routes
}))(AdminContainer);

const Header = (props: { children: React.ReactNode }) => (
  <header
    style={{
      width: "100%",
      backgroundColor: helpers.color.secondary,
      height: 90,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: `0 0 2px ${helpers.color.secondary}`,
      position: "relative"
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        maxWidth: 800,
        margin: "0 1rem"
      }}
    >
      {props.children}
    </div>
  </header>
);

const Content = (props: { children: React.ReactNode }) => (
  <section
    id="admin-content-container"
    style={{
      height: "calc(100vh - 90px)",
      overflowY: "auto",
      display: "flex",
      justifyContent: "center"
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 800,
        margin: "1rem"
      }}
    >
      <Paper>{props.children}</Paper>
    </div>
  </section>
);

export default Admin;
