import React from "react";
import StudentForm from "./StudentForm";
import { History } from "history";
import api from "../../modules/api";

export default (props: { history: History }) => {
  return (
    <StudentForm
      title="Crear Alumno"
      history={props.history}
      submit={student => api.student.create(student)}
    />
  );
};
