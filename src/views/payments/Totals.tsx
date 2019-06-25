import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { Payment } from "../../modules/api/requests/PaymentRequest";
import helpers from "../../helpers";
import { Observable } from "rxjs";
import Button from "../../components/Button";

interface TotalsProps {
  onMonthChangedObservable: Observable<Date | undefined>;
  onPaymentDeletedObservable: Observable<Payment>;
}

type MonthTotal = number | undefined;

const Totals = (props: TotalsProps) => {
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState<MonthTotal>();
  const [invoicedMonthTotal, setInvoicedMonthTotal] = useState<MonthTotal>();

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
          setInvoicedMonthTotal(undefined);
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

export default Totals;
