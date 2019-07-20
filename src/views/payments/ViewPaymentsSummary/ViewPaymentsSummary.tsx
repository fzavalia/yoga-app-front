import React, { useState, useEffect, useCallback } from "react";
import { PaymentsSummary } from "../../../modules/api/requests/PaymentRequest";
import api from "../../../modules/api";
import "./ViewPaymentsSummary.css";
import DatePicker from "react-datepicker";
import {
  CustomDatePickerInput,
  InputContainer,
  InputName
} from "../../../components/FormBuilder/FormBuilder";

const ViewPaymentsSummary = () => {
  const [summary, setSummary] = useState<PaymentsSummary | undefined>();
  const [month, setMonth] = useState(new Date());

  const fetchSummary = useCallback(async () => {
    const summary = await api.payment.summary(month);
    // Remove students that dont have assistances or payments in given month
    summary.students = summary.students.filter(
      student => student.payed !== 0 || student.assisted !== 0
    );
    // Sort students alphabetically
    summary.students = summary.students.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    setSummary(summary);
  }, [month]);

  useEffect(() => {
    fetchSummary();
  }, [month]);

  if (!summary) {
    return null;
  }

  return (
    <>
      {/** Title */}
      <h1 style={{ textAlign: "center" }}>Resumen de Pagos</h1>
      {/** Totals */}
      <InputContainer>
        <InputName>Seleccione el Mes</InputName>
        <DatePicker
          showMonthYearPicker
          selected={month}
          onChange={date => setMonth(date || month)}
          customInput={<CustomDatePickerInput />}
        />
      </InputContainer>

      <div className="payments-summary-totals">
        <span>Total: ${summary.total}</span>
        <span>Facturado: ${summary.totalInvoiced}</span>
      </div>
      <br />
      <p>Los alumnos que no tengan asistencias ni pagos en el mes seleccionado no se mostraran en la lista</p>
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
