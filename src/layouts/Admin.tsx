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
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../modules/redux/actions";

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
      <Sidebar
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
      boxShadow: `0 0 5px ${helpers.color.secondary}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <ToggleSidebarButton onClick={props.onOpenSidebar} />
    <ConnectedLogoutButton />
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

const LogoutButton = (props: { onClick: () => void }) => (
  <div
    style={{
      cursor: "pointer",
      width: "3rem",
      height: "3rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
    onClick={() => {
      const shouldLogout = window.confirm(
        "¿Desea salir de la plataforma? Debera volver a ingresar su email y contraseña para volver a entrar."
      );
      if (shouldLogout) {
        props.onClick();
      }
    }}
  >
    <FontAwesomeIcon color={helpers.color.primaryLight} icon={faSignOutAlt} />
  </div>
);

const ConnectedLogoutButton = connect(
  null,
  dispatch => ({ onClick: () => dispatch(logout()) })
)(LogoutButton);

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
}) => {
  return (
    <section
      style={{
        position: "fixed",
        top: 0,
        backgroundColor: helpers.color.secondary,
        height: "100vh",
        width: props.open ? "100%" : 0,
        maxWidth: 300,
        boxShadow: `0 0 5px ${helpers.color.secondary}`,
        transition: "width 200ms",
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem"
        }}
      >
        <ToggleSidebarButton onClick={props.onCloseSidebar} />
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
