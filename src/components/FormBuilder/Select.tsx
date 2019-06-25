import React, { useState } from "react";
import { makeInputStyle } from "./Input";

export type SelectOption = { value: any; label: string };

const Select = (props: {
  name: string;
  value: any;
  onChange: (name: string, value: any) => void;
  options: SelectOption[];
  invalid?: boolean;
}) => {
  const [focused, setFocused] = useState(false);

  let style: React.CSSProperties = makeInputStyle({
    focused: focused,
    invalid: props.invalid
  });
  
  style.backgroundColor = "unset";

  return (
    <select
      name={props.name}
      value={props.value}
      style={style}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={e => props.onChange(props.name, e.target.value)}
    >
      <option value="">-</option>
      {props.options.map((o, k) => {
        return (
          <option key={k} value={o.value}>
            {o.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
