import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Route } from "../routes/routes";
import Layout from "./Layout";
import Button from "../components/Button";
import helpers from "../helpers";
import Paper from "../components/Paper";
import { connect } from "react-redux";
import { AppState } from "../modules/redux/reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { logout, LogoutAction } from "../modules/redux/actions";

const Admin: Layout = (props: { children: React.ReactNode }) => (
  <ConnectedAdminContainer>{props.children}</ConnectedAdminContainer>
);

const AdminContainer = (props: {
  children: React.ReactNode;
  routes: Route[];
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      <ConnectedSidebar
        routes={props.routes}
        open={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />
      <Content>{props.children}</Content>
    </>
  );
};

const ConnectedAdminContainer = connect((state: AppState) => ({
  routes: state.auth.routes
}))(AdminContainer);

const Header = (props: { onOpenSidebar: () => void }) => (
  <header
    style={{
      backgroundColor: helpers.color.secondary,
      height: 50,
      boxShadow: `0 0 2px ${helpers.color.secondary}`,
      display: "flex",
      alignItems: "center"
    }}
  >
    <ToggleSidebarButton onClick={props.onOpenSidebar} />
  </header>
);

const ToggleSidebarButton = (props: { onClick: () => void }) => (
  <div
    style={{
      cursor: "pointer",
      width: "3rem",
      height: "3rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
    onClick={props.onClick}
  >
    <FontAwesomeIcon color={helpers.color.primaryLight} icon={faBars} />
  </div>
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

const Sidebar = (props: {
  routes: Route[];
  open: Boolean;
  onCloseSidebar: () => void;
  logout: () => LogoutAction;
}) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem"
        }}
      >
        <ToggleSidebarButton onClick={props.onCloseSidebar} />
        <Button
          onClick={() => {
            const res = window.confirm(
              "¿Desea salir de la plataforma? Deberá ingresar su email y contraseña para volver a ingresar."
            );
            if (res) {
              props.logout();
            }
          }}
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

const ConnectedSidebar = connect(
  null,
  dispatch => ({
    logout: () => dispatch(logout())
  })
)(Sidebar);

export default Admin;
