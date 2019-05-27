import React from "react";

const Checkbox = (props: {
  name: string;
  value: boolean;
  onChange: (name: string, value: boolean) => void;
  invalid?: boolean;
}) => {
  return (
    <input
      type="checkbox"
      checked={props.value}
      onChange={e => props.onChange(props.name, e.target.checked)}
    />
  );
};

export default Checkbox