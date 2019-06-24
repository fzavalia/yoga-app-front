import React from "react";
import api from "../../modules/api";
import { History } from "history";
import { PaymentType } from "../../modules/api/requests/PaymentRequest";
import helpers from "../../helpers";
import BrowseView, { FilterType } from "../../components/BrowseView";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";
import { PaginatedListOptions } from "../../modules/api/impl/ApiModelRequest";

export default (props: { history: History }) => {
  return (
    <BrowseView
      title="Pagos"
      history={props.history}
      createItemPath={`/payments/create`}
      updateItemPath={payment => `/payments/update/${payment.id}`}
      deletePromise={payment => api.payment.delete(payment.id)}
      deleteMessage={payment => "Eliminar Pago" + payment.student.name}
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
      loadMore={(page, filters) => {
        const options: PaginatedListOptions = {
          include: ["student"],
          order: { by: "payed_at", type: OrderType.DESC }
        };
        if (filters) {
          // Filter by name
          options.whereRelation = {
            name: { relation: "student", value: filters.name }
          };
          // Filter by month
          if (filters.month) {
            const dateRange = helpers.date.getMonthRange(filters.month);
            options.whereBetween = {
              payed_at: { min: dateRange.start, max: dateRange.end }
            };
          }
        }
        return api.payment.paginatedList(page, options);
      }}
      filters={[
        { name: "name", label: "Buscar por nombre del pagador" },
        { name: "month", label: "Buscar por Més", type: FilterType.MONTH }
      ]}
      extras={<div>foo</div>}
    />
  );
};
