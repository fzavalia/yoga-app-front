import React from "react";
import Layout from "./Layout";

const Blank: Layout = (props: { children: React.ReactNode }) => {
  return <section style={{ padding: "1rem" }}>{props.children}</section>;
};

export default Blank;
