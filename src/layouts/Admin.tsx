import React, { useState } from "react";
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
    <Header />
    <Sidebar routes={props.routes} open={false} />
    <Content>{props.children}</Content>
  </>
);

const ConnectedAdminContainer = connect((state: AppState) => ({
  routes: state.auth.routes
}))(AdminContainer);

const Header = () => (
  <header
    style={{
      backgroundColor: helpers.color.secondary,
      height: 50,
      boxShadow: `0 0 2px ${helpers.color.secondary}`
    }}
  >
    
    {/** Open Sidebar Button */}
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

const Sidebar = (props: { routes: Route[]; open: Boolean }) => {
  if (!props.open) {
    return null;
  }

  return (
    <section
      style={{
        position: "fixed",
        top: 0,
        backgroundColor: helpers.color.secondaryDark,
        height: "100vh",
        width: "100%"
      }}
    >
      <div>
        <Button
          colors={{
            main: helpers.color.primary,
            selected: helpers.color.primaryLight
          }}
        >
          Close
        </Button>
        <Button
          colors={{
            main: helpers.color.primary,
            selected: helpers.color.primaryLight
          }}
        >
          Logout
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {props.routes
          .filter(route => route.isModuleEntrypoint)
          .map((route, key) => (
            <Link
              key={key}
              to={route.path}
              style={{ width: "100%", maxWidth: 200 }}
            >
              <Button
                style={{ display: "block", marginBottom: "1rem" }}
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
      </div>
    </section>
  );
};

export default Admin;
