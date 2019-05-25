import React from "react";
import Form from "./PaymentForm";
import { History } from "history";
import api from "../../modules/api";

export default (props: { history: History }) => {
  return (
    <Form
      title="Crear Pago"
      history={props.history}
      submit={payment => api.payment.create(payment)}
    />
  );
};
