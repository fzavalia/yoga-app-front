import React, { useState } from "react";

type ButtonProps = {
  colors: { main: string; selected?: string };
  children?: any;
  size?: "xs" | "sm" | "md";
  style?: React.CSSProperties;
  selected?: boolean;
  onClick?: () => void;
};

export default (props: ButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onClick={props.onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={makeStyle(props, isHover)}
    >
      {props.children}
    </div>
  );
};

const makeStyle = (props: ButtonProps, isHover: boolean) => {
  let style: React.CSSProperties = {
    display: "inline-block",
    textAlign: "center",
    color: props.colors.main,
    border: "1px solid " + props.colors.main,
    borderRadius: "5px",
    cursor: "pointer",
    transition: "color 500ms, border-color 500ms"
  };

  if (props.selected || isHover) {
    style.borderColor = props.colors.selected || props.colors.main;
    style.color = props.colors.selected || props.colors.main;
  }

  switch (props.size) {
    case "xs":
      style.padding = "0.2rem 0.4rem";
      break;
    case "sm":
      style.padding = "0.4rem 0.7rem";
      break;
    default:
      style.padding = "0.7rem 1rem";
      break;
  }

  style = { ...style, ...(props.style || {}) };

  return style;
};
