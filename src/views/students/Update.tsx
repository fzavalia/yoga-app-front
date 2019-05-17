import React from "react";
import Form from "./Form";
import { History } from "history";

export default (props: { history: History }) => {
  return (
    <Form
      title="Actualizar Alumno"
      history={props.history}
      submit={_ => Promise.resolve()}
    />
  );
};
