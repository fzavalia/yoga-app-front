import React, { useState } from "react";
import Button from "../Button";
import helpers from "../../helpers";
import { SelectOption } from "./Select";
import { makeInputStyle } from "./Input";

const MultiSelect = (props: {
  name: string;
  values: any[];
  onChange: (name: string, value: any[]) => void;
  options: SelectOption[];
  invalid?: boolean;
}) => {
  const [focused, setFocused] = useState(false);

  let style: React.CSSProperties = makeInputStyle({
    focused: focused,
    invalid: props.invalid
  });
  style.backgroundColor = "unset";

  const selectableOptions = props.options.filter(
    option => !props.values.includes(option.value)
  );

  return (
    <>
      {props.values.map((value, key) => {
        const match = helpers.array.findOrFail<SelectOption>(
          props.options,
          o => o.value === value
        );
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "0.5rem"
            }}
            key={key}
          >
            <div style={{ fontSize: "0.9rem" }}>{match.label}</div>
            <Button
              size="xs"
              colors={{ main: helpers.color.danger }}
              onClick={() =>
                props.onChange(
                  props.name,
                  props.values.filter(otherValue => otherValue !== value)
                )
              }
            >
              X
            </Button>
          </div>
        );
      })}
      <select
        name={props.name}
        style={style}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => {
          if (!e.target.value) {
            return;
          }
          props.onChange(
            props.name,
            props.values.concat([parseInt(e.target.value)])
          );
          e.currentTarget.value = "";
        }}
      >
        <option value="" disabled selected>
          -
        </option>
        {selectableOptions.map((o, k) => {
          return (
            <option key={k} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default MultiSelect;
