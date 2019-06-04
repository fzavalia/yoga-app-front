import React from "react";
import Layout from "./Layout";

const Auth: Layout = (props: { children: React.ReactNode }) => {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem"
      }}
    >
      {props.children}
    </section>
  );
};

export default Auth;
