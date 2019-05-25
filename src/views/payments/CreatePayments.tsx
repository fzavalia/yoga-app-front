import React, { useState, useEffect } from "react";
import Form from "./PaymentForm";
import { History } from "history";
import api from "../../modules/api";

export default (props: { history: History }) => {
  const [studentOptions, setStudentOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    api.student
      .list()
      .then(students =>
        students.map(student => ({ value: student.id, label: student.name }))
      )
      .then(setStudentOptions);
  }, []);

  return (
    <Form
      title="Crear Pago"
      history={props.history}
      submit={payment => api.payment.create(payment)}
      studentOptions={studentOptions}
    />
  );
};
