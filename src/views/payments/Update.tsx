import React, { useState, useEffect } from "react";
import Form from "./Form";
import { History } from "history";
import api from "../../modules/api";
import { match } from "react-router";
import { Payment } from "../../modules/api/apiModelRequests/PaymentApiModelRequest";
import { format } from "date-fns";

export default (props: { history: History; match: match<{ id: string }> }) => {
  const [payment, setPayment] = useState<Payment>();

  useEffect(() => {
    api.payment.show(parseInt(props.match.params.id)).then(setPayment);
  }, [props.match.params.id]);

  const [studentOptions, setStudentOptions] = useState<
    { value: number; label: string }[] | undefined
  >();

  useEffect(() => {
    api.student
      .list()
      .then(students =>
        students.map(student => ({ value: student.id, label: student.name }))
      )
      .then(setStudentOptions);
  }, []);

  if (!payment || !studentOptions) {
    return null;
  }

  return (
    <Form
      title="Actualizar Alumno"
      history={props.history}
      initialValues={{
        amount: payment.amount,
        payedAt: format(payment.payedAt, "YYYY-MM-DD"),
        studentId: payment.studentId,
        type: payment.type
      }}
      submit={values => api.payment.update(payment.id, values)}
      studentOptions={studentOptions}
    />
  );
};
