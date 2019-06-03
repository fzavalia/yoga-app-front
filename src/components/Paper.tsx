import React from "react";
import helpers from "../helpers";

const Paper = (props: { children: React.ReactNode }) => (
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
);

export default Paper;
