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

  return (
    <>
      <RepresentedMonthInput value={date} onChange={setDate} />
      {tableData && <AssistanceTable date={date} data={tableData} />}
    </>
  );
};

const RepresentedMonthInput = (props: {
  value: Date;
  onChange: (date: Date) => void;
}) => {
  return (
    <div style={{ maxWidth: 200, marginBottom: "1rem" }}>
      <InputName>Més Representado</InputName>
      <Input
        type="month"
        name="date"
        onChange={(_, value) =>
          props.onChange(helpers.date.normalize(new Date(value)))
        }
        value={helpers.date.format(props.value, "YYYY-MM")}
      />
    </div>
  );
};

const AssistanceTable = (props: { date: Date; data: AssistanceTableData }) => {
  const today = helpers.date.normalize(new Date());

  const dateOfToday = today.getDate();

  const providedMonthIsEqualToTodayMonth =
    today.getMonth() === props.date.getMonth();

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
  daysInMonth.forEach(dayInMonth => {
    columns.push({
      id: dayInMonth.toString(),
      headerStyle: (() => {
        const style: React.CSSProperties = {};
        if (providedMonthIsEqualToTodayMonth && dateOfToday === dayInMonth) {
          style.backgroundColor = helpers.color.secondary;
          style.color = helpers.color.primaryLight;
          style.fontWeight = "bold";
        }
        return style;
      })(),
      Header: dayInMonth,
      accessor: v =>
        props.data.yogaClasses
          .filter(yc => yc.date.getDate() === dayInMonth)
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
