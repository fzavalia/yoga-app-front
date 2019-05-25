import React from "react";
import Form from "./StudentForm";
import { History } from "history";
import api from "../../modules/api";

export default (props: { history: History }) => {
  return (
    <Form
      title="Crear Alumno"
      history={props.history}
      submit={student => api.student.create(student)}
    />
  );
};
