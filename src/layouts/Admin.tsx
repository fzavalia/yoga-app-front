import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes/routes";
import Layout from "./Layout";
import Button from "../components/Button";
import helpers from "../helpers";
import bgImg from "../assets/img/appBg.jpg";

const Admin: Layout = (props: { children: any }) => (
  <>
    <Header>
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
    </Header>
    <Content>{props.children}</Content>
  </>
);

const Header = (props: { children: any }) => (
  <header
    style={{
      width: "100%",
      backgroundColor: helpers.color.secondaryDark,
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

const Content = (props: { children: any }) => (
  <section
    id="admin-content-container"
    style={{
      height: "calc(100vh - 90px)",
      overflowY: "auto",
      display: "flex",
      justifyContent: "center",
      backgroundImage: `url(${bgImg})`,
      backgroundSize: "cover"
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 800,
        margin: "1rem"
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,.8)",
          padding: "1rem",
          borderRadius: 10,
          boxShadow: `0 0 3px 0 ${helpers.color.secondary}`,
          marginBottom: "1rem"
        }}
      >
        {props.children}
      </div>
    </div>
  </section>
);

export default Admin;
