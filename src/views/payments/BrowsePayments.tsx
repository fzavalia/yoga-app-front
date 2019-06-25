import React from "react";
import api from "../../modules/api";
import { History } from "history";
import {
  PaymentType,
  Payment
} from "../../modules/api/requests/PaymentRequest";
import helpers from "../../helpers";
import BrowseView, { FilterType } from "../../components/BrowseView";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";
import { PaginatedListOptions } from "../../modules/api/impl/ApiModelRequest";
import { Subject } from "rxjs";
import Totals from "./Totals";

export default (props: { history: History }) => {
  const onMonthChangedEmitter = new Subject<Date | undefined>();
  const onPaymentDeletedEmitter = new Subject<Payment>();

  return (
    <BrowseView
      title="Pagos"
      history={props.history}
      createItemPath={`/payments/create`}
      updateItemPath={payment => `/payments/update/${payment.id}`}
      deletePromise={payment =>
        api.payment
          .delete(payment.id)
          .then(() => onPaymentDeletedEmitter.next(payment))
      }
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
          // Filter by student
          if (filters.student) {
            console.log(filters.student);
            options.whereRelationEquals = {
              id: { relation: "student", value: filters.student }
            };
          }
          // Filter by month
          if (filters.month) {
            const dateRange = helpers.date.getFormatedMonthRange(filters.month);
            options.whereBetween = {
              payed_at: { min: dateRange.start, max: dateRange.end }
            };
          }
          onMonthChangedEmitter.next(filters.month);
        }
        return api.payment.paginatedList(page, options);
      }}
      filters={[
        {
          name: "student",
          label: "Filtrar por alumno",
          type: FilterType.SELECT_STUDENT
        },
        { name: "month", label: "Buscar por Més", type: FilterType.MONTH }
      ]}
      extras={
        <Totals
          onMonthChangedObservable={onMonthChangedEmitter}
          onPaymentDeletedObservable={onPaymentDeletedEmitter}
        />
      }
    />
  );
};
