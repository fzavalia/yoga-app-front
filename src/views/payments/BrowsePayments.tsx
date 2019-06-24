import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";
import { PaymentType } from "../../modules/api/requests/PaymentRequest";
import helpers from "../../helpers";
import BrowseView, { FilterType } from "../../components/BrowseView";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";
import { PaginatedListOptions } from "../../modules/api/impl/ApiModelRequest";
import { Observable, Subject } from "rxjs";
import Button from "../../components/Button";

export default (props: { history: History }) => {
  const onMonthChangedEmitter = new Subject<Date | undefined>();

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
        { name: "name", label: "Buscar por nombre del pagador" },
        { name: "month", label: "Buscar por Més", type: FilterType.MONTH }
      ]}
      extras={<Totals onMonthChangedObservable={onMonthChangedEmitter} />}
    />
  );
};

interface TotalsProps {
  onMonthChangedObservable: Observable<Date | undefined>;
}

const Totals = (props: TotalsProps) => {
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState<number | undefined>();

  useEffect(() => {
    api.payment.total().then(setTotal);
    const subscription = props.onMonthChangedObservable.subscribe(date => {
      if (!date) {
        setMonthTotal(undefined);
      } else {
        api.payment.total(date).then(setMonthTotal);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!show) {
    return (
      <Button
        colors={{ main: helpers.color.secondary, selected: helpers.color.secondaryLight }}
        onClick={() => setShow(!show)}
        size='sm'
      >
        Mostrar Totales
      </Button>
    );
  }

  return (
    <section style={{ marginTop: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        Total: <b>${total}</b>
      </div>
      {monthTotal !== undefined && (
        <div>
          Total del Mes: <b>${monthTotal}</b>
        </div>
      )}
    </section>
  );
};
