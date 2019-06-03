import React from "react";
import api from "../../modules/api";
import { History } from "history";
import { PaymentType } from "../../modules/api/requests/PaymentRequest";
import helpers from "../../helpers";
import BrowseView from "../../components/BrowseView";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";

export default (props: { history: History }) => {
  return (
    <BrowseView
      mapItem={payment => ({
        title: payment.student.name,
        props: [
          { label: "Monto", value: "$" + payment.amount },
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
          },
          {
            label: "Facturado",
            value: (
              <input
                type="checkbox"
                defaultChecked={payment.invoiced}
                onChange={e =>
                  api.payment.update(payment.id, { invoiced: e.target.checked })
                }
              />
            )
          }
        ]
      })}
      loadMore={page =>
        api.payment.paginatedList(page, {
          include: ["student"],
          order: { by: "payed_at", type: OrderType.DESC }
        })
      }
      history={props.history}
      createItemPath={`/payments/create`}
      updateItemPath={payment => `/payments/update/${payment.id}`}
      deletePromise={payment => api.payment.delete(payment.id)}
      deleteMessage={payment => "Eliminar Pago" + payment.student.name}
    />
  );
};
