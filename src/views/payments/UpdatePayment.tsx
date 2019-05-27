import React, { useState, useEffect } from "react";
import Form from "./PaymentForm";
import { History } from "history";
import api from "../../modules/api";
import { match } from "react-router";
import { Payment } from "../../modules/api/apiModelRequests/PaymentApiModelRequest";
import helpers from "../../helpers";

export default (props: { history: History; match: match<{ id: string }> }) => {
  const [payment, setPayment] = useState<Payment>();

  useEffect(() => {
    api.payment.show(parseInt(props.match.params.id)).then(setPayment);
  }, [props.match.params.id]);

  if (!payment) {
    return null;
  }

  return (
    <Form
      title="Actualizar Pago"
      history={props.history}
      initialValues={{
        amount: payment.amount,
        payedAt: helpers.date.normalizeAndFormatForInput(payment.payedAt),
        studentId: payment.studentId,
        type: payment.type,
        invoiced: payment.invoiced
      }}
      submit={values => api.payment.update(payment.id, values)}
    />
  );
};
