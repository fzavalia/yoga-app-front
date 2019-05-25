import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import { History } from "history";
import api from "../../modules/api";
import { match } from "react-router";

export default (props: { history: History; match: match<{ id: string }> }) => {
  const [student, setStudent] = useState();

  useEffect(() => {
    api.student.show(parseInt(props.match.params.id)).then(setStudent);
  }, [props.match.params.id]);

  if (!student) {
    return null;
  }

  return (
    <StudentForm
      title="Actualizar Alumno"
      history={props.history}
      initialValues={student}
      submit={values => api.student.update(student.id, values)}
    />
  );
};
