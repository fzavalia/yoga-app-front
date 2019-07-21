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
import Checkbox from "../../../components/FormBuilder/Checkbox";

const ViewPaymentsSummary = () => {
  const [summary, setSummary] = useState<PaymentsSummary | undefined>();
  const [month, setMonth] = useState(new Date());
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [showStudentsInDebt, setShowStudentsInDebt] = useState(false);

  const fetchSummary = useCallback(async () => {
    const summary = await api.payment.summary(month);
    // Sort students alphabetically
    summary.students = summary.students.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    setSummary(summary);
  }, [month]);

  const getStudentsInDebt = useCallback(
    () =>
      summary
        ? summary.students.filter(
            student => student.assisted > 0 && student.payed === 0
          )
        : [],
    [summary, showAllStudents]
  );

  const getStudents = useCallback(() => {
    if (!summary) {
      return [];
    } else if (showAllStudents) {
      return summary.students;
    } else {
      // Remove students that dont have assistances or payments in given month
      return summary.students.filter(
        student => student.payed !== 0 || student.assisted !== 0
      );
    }
  }, [summary, showAllStudents]);

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
      <SummaryCheckbox
        name="showStudentsInDebt"
        label="Mostrar a los alumnos que no han pagado clases de este més"
        value={showStudentsInDebt}
        setValue={setShowStudentsInDebt}
      />
      {showStudentsInDebt && (
        <SummaryTable
          title="Deudores del més"
          getStudents={getStudentsInDebt}
        />
      )}
      <SummaryCheckbox
        name="showStudents"
        label="Incluir alumnos que no asistieron ni pagaron este més"
        value={showAllStudents}
        setValue={setShowAllStudents}
      />
      <SummaryTable
        title="Pagos y asistencias por alumno"
        getStudents={getStudents}
      />
    </>
  );
};

const SummaryCheckbox = (props: {
  name: string;
  label: string;
  value: boolean;
  setValue: (v: boolean) => void;
}) => (
  <div className="payments-summary-checkbox">
    <Checkbox
      name={props.name}
      onChange={(_, value) => props.setValue(value)}
      value={props.value}
    />
    <span>{props.label}</span>
  </div>
);

const SummaryTable = (props: {
  title: string;
  getStudents: () => {
    id: number;
    name: string;
    payed: number;
    assisted: number;
  }[];
}) => (
  <>
    <h4>{props.title}</h4>
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
      {props.getStudents().map(student => (
        <div className="payments-summary-student-table-item" key={student.id}>
          <span style={{ flex: 1 }}>{student.name}</span>
          <span style={{ flex: 1, textAlign: "right" }}>${student.payed}</span>
          <span style={{ flex: 1, textAlign: "right" }}>
            {student.assisted}
          </span>
        </div>
      ))}
    </div>
  </>
);

export default ViewPaymentsSummary;
