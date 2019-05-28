import React, { useState, useEffect } from "react";
import Input from "../../components/FormBuilder/Input";
import { InputName } from "../../components/FormBuilder/FormBuilder";
import helpers from "../../helpers";
import api from "../../modules/api";
import { AssistanceGraphData } from "../../modules/api/requests/AssistanceGraphRequest";
import ReactTable, { Column } from "react-table";
import "react-table/react-table.css";

const ViewAssistanceGraph = () => {
  const [date, setDate] = useState(helpers.date.normalize(new Date()));

  const [graphData, setGraphData] = useState<AssistanceGraphData | undefined>();

  useEffect(() => {
    api.assistanceGraph.getDataForMonth(date).then(setGraphData);
  }, [date]);

  let assistanceGraphTable = null;

  if (graphData) {
    assistanceGraphTable = (
      <AssistanceGraphTable date={date} data={graphData} />
    );
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
      {assistanceGraphTable}
    </>
  );
};

const AssistanceGraphTable = (props: {
  date: Date;
  data: AssistanceGraphData;
}) => {
  const daysInMonth = helpers.array.incremental(
    helpers.date.getDaysInMonth(props.date),
    1
  );

  const columns: Column[] = [];

  columns.push({
    Header: <div style={{ textAlign: "left" }}>Alumno</div>,
    accessor: "name"
  });

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
      maxWidth: 40
    });
  });

  columns.push({
    id: "amount",
    Header: <div style={{ textAlign: "right" }}>Pagado</div>,
    accessor: v =>
      props.data.payments
        .filter(p => p.studentId === v.id)
        .map(p => p.amount)
        .reduce((sum, amount) => sum + amount, 0),
    Cell: v => <div style={{ textAlign: "right" }}>{v.value}</div>
  });

  return (
    <ReactTable
      data={props.data.students}
      columns={columns}
      showPagination={false}
    />
  );
};

export default ViewAssistanceGraph;
