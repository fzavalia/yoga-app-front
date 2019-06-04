import React from "react";
import helpers from "../helpers";

const Paper = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => (
  <div
    {...props}
    style={Object.assign(
      {
        backgroundColor: "rgba(255,255,255,.8)",
        padding: "1rem",
        borderRadius: 10,
        boxShadow: `0px 0px 15px -10px ${helpers.color.secondaryDark}`,
        marginBottom: "1rem"
      },
      props.style
    )}
  >
    {props.children}
  </div>
);

export default Paper;
