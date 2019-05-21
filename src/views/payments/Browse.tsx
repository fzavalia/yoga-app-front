import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";
import {
  Payment,
  PaymentType
} from "../../modules/api/apiModelRequests/PaymentApiModelRequest";
import { format } from "date-fns";

export default (props: { history: History }) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    api.payment.list({ include: ["student"] }).then(setPayments);
  }, []);

  return (
    <BrowseView
      payments={payments}
      onUpdatePaymentClick={payment =>
        props.history.push(`/payments/${payment.id}/update`)
      }
      onDeletePaymentClick={payment => {
        if (
          window.confirm(
            "Eliminar Pago de " + (payment.student ? payment.student.name : "")
          )
        ) {
          api.payment
            .delete(payment.id)
            .then(() => setPayments(payments.filter(x => x.id !== payment.id)));
        }
      }}
      onCreatePaymentClick={() => props.history.push(`/payments/create`)}
    />
  );
};

const BrowseView = (props: {
  payments: Payment[];
  onCreatePaymentClick: () => void;
  onUpdatePaymentClick: (payment: Payment) => void;
  onDeletePaymentClick: (payment: Payment) => void;
}) => (
  <>
    <h1>Pagos</h1>
    <button onClick={props.onCreatePaymentClick}>Crear</button>
    <ul>
      {props.payments.map((payment: Payment) => (
        <li key={payment.id}>
          <h3>{payment.student ? payment.student.name : ""}</h3>
          <section>
            Cantidad: {payment.amount}
            <br />
            Fecha: {format(payment.payedAt, "DD-MMM-YYYY")}
            <br />
            Forma de Pago:{" "}
            {payment.type === PaymentType.CREDIT_CARD ? "Tarjeta" : "Efectivo"}
          </section>
          <section>
            <button onClick={() => props.onUpdatePaymentClick(payment)}>
              Editar
            </button>
            <button onClick={() => props.onDeletePaymentClick(payment)}>
              Borrar
            </button>
          </section>
        </li>
      ))}
    </ul>
  </>
);
