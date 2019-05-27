import React, { useState, useEffect } from "react";
import Input from "../../components/FormBuilder/Input";
import { InputName } from "../../components/FormBuilder/FormBuilder";
import helpers from "../../helpers";
import { Student } from "../../modules/api/apiModelRequests/StudentApiModelRequest";
import { YogaClass } from "../../modules/api/apiModelRequests/YogaClassApiModelRequest";
import api from "../../modules/api";

const AssistanceGraph = () => {
  const [date, setDate] = useState(helpers.date.normalize(new Date()));

  const [graphData, setGraphData] = useState<
    { classes: YogaClass[] } | undefined
  >();

  useEffect(() => {
    const monthRange = getMonthRange(date);
    api.yogaClass.list({
      include: ['students', 'students.payments'],
      whereBetween: {
        date: {
          min: monthRange[0],
          max: monthRange[1]
        }
      }
    });
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
    </>
  );
};

const getMonthRange = (date: Date) => {
  const d1 = new Date(date);
  const d2 = new Date(d1);

  d1.setDate(1);
  d2.setDate(helpers.date.getDaysInMonth(d1.getFullYear(), d1.getMonth()));

  return [
    helpers.date.format(d1, "YYYY-MM-DD"),
    helpers.date.format(d2, "YYYY-MM-DD")
  ];
};

export default AssistanceGraph;
