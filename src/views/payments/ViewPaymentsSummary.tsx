import React, { useState, useEffect } from "react";
import { PaymentsSummary } from "../../modules/api/requests/PaymentRequest";
import api from "../../modules/api";
import "./ViewPaymentsSummary.css";

const ViewPaymentsSummary = () => {
  const [summary, setSummary] = useState<PaymentsSummary | undefined>();
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    api.payment.summary(month).then(setSummary);
  }, []);

  if (!summary) {
    return null;
  }

  return (
    <>
      {/** Title */}
      <h1 style={{ textAlign: "center" }}>Resumen de Pagos</h1>
      {/** Totals */}
      <div className="payments-summary-totals">
        <span>Total: ${summary.total}</span>
        <span>Facturado: ${summary.totalInvoiced}</span>
      </div>
      <br />
      <div className="payments-summary-student-table">
        {/** Header */}
        <div className="payments-summary-student-table-header">
          <span style={{ flex: 1 }}>Alumno</span>
          <span style={{ flex: 1, textAlign: "right" }}>Pagado</span>
          <span style={{ flex: 1, textAlign: "right" }}>Asistencias</span>
        </div>
        {/** Header Separator */}
        <div style={{ height: 1, backgroundColor: "#ccc" }} />
        {/** Students */}
        {summary.students.map(student => (
          <div className="payments-summary-student-table-item" key={student.id}>
            <span style={{ flex: 1 }}>{student.name}</span>
            <span style={{ flex: 1, textAlign: "right" }}>
              ${student.payed}
            </span>
            <span style={{ flex: 1, textAlign: "right" }}>
              {student.assisted}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewPaymentsSummary;
