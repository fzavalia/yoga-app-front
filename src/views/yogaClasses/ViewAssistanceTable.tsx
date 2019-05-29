import React, { useState, useEffect } from "react";
import Input from "../../components/FormBuilder/Input";
import { InputName } from "../../components/FormBuilder/FormBuilder";
import helpers from "../../helpers";
import api from "../../modules/api";
import { AssistanceTableData } from "../../modules/api/requests/AssistanceTableRequest";
import ReactTable, { Column } from "react-table";
import "react-table/react-table.css";

const ViewAssistanceTable = () => {
  const [date, setDate] = useState(helpers.date.normalize(new Date()));

  const [tableData, setTableData] = useState<AssistanceTableData | undefined>();

  useEffect(() => {
    api.assistanceTable.getDataForMonth(date).then(setTableData);
  }, [date]);

  let assistanceTable = null;

  if (tableData) {
    assistanceTable = <AssistanceTable date={date} data={tableData} />;
  }

  return (
    <>
      <div style={{ maxWidth: 200, marginBottom: "1rem" }}>
        <InputName>Més del Grafico</InputName>
        <Input
          type="month"
          name="date"
          onChange={(_, value) =>
            setDate(helpers.date.normalize(new Date(value)))
          }
          value={helpers.date.format(date, "YYYY-MM")}
        />
      </div>
      {assistanceTable}
    </>
  );
};

const AssistanceTable = (props: { date: Date; data: AssistanceTableData }) => {
  const daysInMonth = helpers.array.incremental(
    helpers.date.getDaysInMonth(props.date),
    1
  );

  const columns: Column[] = [];

  // Student Names
  columns.push({
    Header: <div style={{ textAlign: "left" }}>Alumno</div>,
    accessor: "name"
  });

  // Days
  daysInMonth.forEach(d => {
    columns.push({
      id: d.toString(),
      Header: d,
      accessor: v =>
        props.data.yogaClasses
          .filter(yc => yc.date.getDate() === d)
          .some(yc => yc.studentIds.includes(v.id))
          ? "X"
          : " ",
      Cell: v => <div style={{ textAlign: "center" }}>{v.value}</div>,
      maxWidth: 50,
      resizable: false
    });
  });

  // Total Payed
  columns.push({
    id: "amount",
    Header: <div style={{ textAlign: "right" }}>Pagado</div>,
    accessor: v =>
      props.data.payments
        .filter(p => p.studentId === v.id)
        .map(p => p.amount)
        .reduce((sum, amount) => sum + amount, 0),
    Cell: v => <div style={{ textAlign: "right" }}>${v.value}</div>,
    resizable: false
  });

  return (
    <ReactTable
      style={{ color: helpers.color.secondary }}
      data={props.data.students}
      columns={columns}
      showPagination={false}
      className="-striped -highlight"
    />
  );
};

export default ViewAssistanceTable;
