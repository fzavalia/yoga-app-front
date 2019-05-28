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

  return (
    <>
      <div style={{ maxWidth: 200 }}>
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
      {graphData && <div>{JSON.stringify(graphData)}</div>}
    </>
  );
};

export default ViewAssistanceGraph;
