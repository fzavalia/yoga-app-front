import React, { useState } from "react";
import helpers from "../../helpers";

const Input = (props: {
  name: string;
  type: string;
  value: any;
  onChange: (name: string, value: any) => void;
  invalid?: boolean;
}) => {
  const [focused, setFocused] = useState(false);

  let style: React.CSSProperties = makeInputStyle({
    focused,
    invalid: props.invalid
  });

  return (
    <input
      type={props.type}
      style={style}
      onChange={e => props.onChange(props.name, e.target.value)}
      value={props.value}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

export const makeInputStyle = (props: {
  focused: boolean;
  invalid?: boolean;
}) => {
  let style: React.CSSProperties = {
    width: "100%",
    border: "unset",
    fontSize: "1rem",
    height: "2rem",
    borderBottom: "solid 1px " + helpers.color.secondary,
    transition: "border-bottom-color 500ms"
  };

  if (props.focused) {
    style.outline = "unset";
    style.borderBottomColor = helpers.color.secondaryLight;
  }

  if (props.invalid) {
    style.borderBottomColor = helpers.color.danger;
  }
  return style;
};

export default Input;