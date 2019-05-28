import React from "react";
import Layout from "./Layout";

const Blank: Layout = (props: { children: any }) => {
  return <section style={{ padding: "1rem" }}>{props.children}</section>;
};

export default Blank;
