import React from "react";
import Layout from "./Layout";
import bgImg from '../assets/img/appBgLQ.jpg'

const Auth: Layout = (props: { children: React.ReactNode }) => {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        padding: '1rem'
      }}
    >
      {props.children}
    </section>
  );
};

export default Auth;
