import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";
import {
  Payment,
  PaymentType
} from "../../modules/api/apiModelRequests/PaymentApiModelRequest";
import helpers from "../../helpers";
import BrowseView from "../../components/BrowseView";

export default (props: { history: History }) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    api.payment.list({ include: ["student"] }).then(setPayments);
  }, []);

  return (
    <BrowseView
      items={payments}
      mapItem={payment => ({
        title: payment.student.name,
        props: [
          { label: "Monto", value: '$' + payment.amount },
          {
            label: "Fecha",
            value: helpers.date.normalizeAndFormat(
              payment.payedAt,
              "DD-MMM-YYYY"
            )
          },
          {
            label: "Forma de Pago",
            value:
              payment.type === PaymentType.CREDIT_CARD ? "Tarjeta" : "Efectivo"
          }
        ]
      })}
      onUpdateClick={payment =>
        props.history.push(`/payments/update/${payment.id}`)
      }
      onDeleteClick={payment => {
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
      onCreateClick={() => props.history.push(`/payments/create`)}
    />
  );
};
