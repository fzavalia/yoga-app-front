import React from "react";
import Button from "./Button";
import helpers from "../helpers";

export default (props: {
  title: string;
  children: any;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  return (
    <>
      <Title>{props.title}</Title>
      <form onSubmit={e => e.preventDefault()}>
        {props.children}
        <Button
          size="sm"
          colors={{ main: helpers.color.secondary }}
          onClick={props.onCancel}
        >
          Cancelar
        </Button>
        <Button
          size="sm"
          style={{ float: "right" }}
          colors={{ main: helpers.color.secondary }}
          onClick={props.onSubmit}
        >
          Enviar
        </Button>
      </form>
    </>
  );
};

const Title = (props: { children: any }) => (
  <h1 style={{ textAlign: "center" }}>{props.children}</h1>
);

export const InputTitle = (props: { children: any }) => (
  <div style={{ color: helpers.color.secondary, fontSize: "0.8rem" }}>
    {props.children}
  </div>
);

const sharedStyle: React.CSSProperties = {
  width: "100%",
  border: "unset",
  fontSize: "1rem",
  height: "2rem",
  borderBottom: "solid 1px " + helpers.color.secondary,
  marginBottom: "1rem",
  transition: "border-bottom-color 500ms"
};
// css`
//   width: 100%;
//   border: unset;
//   font-size: 1rem;
//   height: 2rem;
//   border-bottom: solid 1px ${helpers.color.secondary};
//   margin-bottom: 1rem;
//   transition: border-bottom-color 500ms;
//   &.invalid {
//     border-bottom-color: ${helpers.color.danger};
//   }
//   &:focus {
//     outline: unset;
//     border-bottom-color: ${helpers.color.secondaryLight};
//   }
// `;

export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => <input style={sharedStyle} {...props} />;

export const Select = (
  props: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
) => <select style={{ ...sharedStyle, backgroundColor: "unset" }} {...props} />;
