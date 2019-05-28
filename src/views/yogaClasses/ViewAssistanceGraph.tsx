import React, { useState, useEffect } from "react";
import Input from "../../components/FormBuilder/Input";
import { InputName } from "../../components/FormBuilder/FormBuilder";
import helpers from "../../helpers";
import api from "../../modules/api";
import { AssistanceGraphData } from "../../modules/api/requests/AssistanceGraphRequest";

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

  return (
    <table
      cellSpacing={0}
      style={{
        width: "100%",
        padding: "1.3rem",
        color: helpers.color.secondary,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5
      }}
    >
      <thead>
        <tr>
          <th
            align="left"
            style={{
              borderRightStyle: "solid",
              borderRightWidth: 1,
              paddingBottom: "1rem"
            }}
          >
            Alumno
          </th>
          {daysInMonth.map(dim => (
            <th style={{ paddingBottom: "1rem" }} key={dim}>
              <div style={{ minWidth: "1.2rem" }}>{dim}</div>
            </th>
          ))}
          <th
            align="right"
            style={{
              borderLeftStyle: "solid",
              borderLeftWidth: 1,
              paddingBottom: "1rem"
            }}
          >
            Pagado
          </th>
        </tr>
      </thead>
      <tbody>
        {props.data.students.map(s => (
          <tr key={s.id}>
            <td
              style={{
                borderRightStyle: "solid",
                borderRightWidth: 1,
                paddingBottom: "1rem"
              }}
            >
              {s.name}
            </td>
            {daysInMonth.map(dim => (
              <td align="center" style={{ paddingBottom: "1rem" }} key={dim}>
                {props.data.yogaClasses
                  .filter(yc => yc.date.getDate() === dim)
                  .some(yc => yc.studentIds.includes(s.id))
                  ? "X"
                  : " "}
              </td>
            ))}
            <td
              align="right"
              style={{
                borderLeftStyle: "solid",
                borderLeftWidth: 1,
                paddingBottom: "1rem"
              }}
            >
              {props.data.payments
                .filter(p => p.studentId === s.id)
                .map(p => p.amount)
                .reduce((sum, amount) => sum + amount, 0)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewAssistanceGraph;
