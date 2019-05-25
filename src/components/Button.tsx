import React, { useState } from "react";

type ButtonProps = {
  colors: { main: string; selected?: string };
  children?: any;
  size?: "sm" | "md";
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
    padding: "0.7rem 1rem",
    cursor: "pointer",
    transition: "color 500ms, border-color 500ms"
  };
  if (props.selected || isHover) {
    style.borderColor = props.colors.selected || props.colors.main;
    style.color = props.colors.selected || props.colors.main;
  }
  style = { ...style, ...(props.style || {}) };
  if (props.size === "sm") {
    style.padding = "0.4rem 0.7rem";
  }
  return style;
};
