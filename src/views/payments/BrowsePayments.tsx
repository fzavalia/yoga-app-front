import React, { useState, useEffect } from "react";
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
import { Observable, Subject } from "rxjs";
import Button from "../../components/Button";

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
      extras={
        <Totals
          onMonthChangedObservable={onMonthChangedEmitter}
          onPaymentDeletedObservable={onPaymentDeletedEmitter}
        />
      }
    />
  );
};

interface TotalsProps {
  onMonthChangedObservable: Observable<Date | undefined>;
  onPaymentDeletedObservable: Observable<Payment>;
}

const Totals = (props: TotalsProps) => {
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState<number | undefined>();
  const [invoicedMonthTotal, setInvoicedMonthTotal] = useState<
    number | undefined
  >();

  useEffect(() => {
    // Get Total from all payments since the beginning
    api.payment.total().then(setTotal);
  }, []);

  useEffect(() => {
    // Get Total for the month when a new month is selected
    const onMonthChangedSubscription = props.onMonthChangedObservable.subscribe(
      month => {
        if (!month) {
          setMonthTotal(undefined);
        } else {
          api.payment.total({ month }).then(setMonthTotal);
          api.payment
            .total({ month, invoiced: true })
            .then(setInvoicedMonthTotal);
        }
      }
    );
    // Update totals whenever a payment is deleted
    const onPaymentDeletedSubscription = props.onPaymentDeletedObservable.subscribe(
      payment => {
        setTotal(total - payment.amount);
        if (monthTotal !== undefined) {
          setMonthTotal(monthTotal - payment.amount);
        }
        if (invoicedMonthTotal !== undefined && payment.invoiced) {
          setInvoicedMonthTotal(invoicedMonthTotal - payment.amount);
        }
      }
    );
    // Handle Unsubscriptions
    return () => {
      onMonthChangedSubscription.unsubscribe();
      onPaymentDeletedSubscription.unsubscribe();
    };
  }, [total, monthTotal, invoicedMonthTotal]);

  if (!show) {
    return (
      <Button
        colors={{
          main: helpers.color.secondary,
          selected: helpers.color.secondaryLight
        }}
        onClick={() => setShow(!show)}
        size="sm"
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
        <div style={{ marginBottom: "1rem" }}>
          Total del Mes: <b>${monthTotal}</b>
        </div>
      )}
      {invoicedMonthTotal !== undefined && (
        <div>
          Total Facturado del Mes: <b>${invoicedMonthTotal}</b>
        </div>
      )}
    </section>
  );
};
