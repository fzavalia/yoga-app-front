import React, { useState, useEffect, useCallback } from "react";
import Input from "../../components/FormBuilder/Input";
import { InputName } from "../../components/FormBuilder/FormBuilder";
import helpers from "../../helpers";
import api from "../../modules/api";
import { AssistanceTableData } from "../../modules/api/requests/AssistanceTableRequest";
import ReactTable, { Column } from "react-table";
import "react-table/react-table.css";

const ViewAssistanceTable = () => {
  const [date, setDate] = useState(new Date());

  const [tableData, setTableData] = useState<AssistanceTableData | undefined>();

  const [studentNameFilter, setStudentNameFilter] = useState("");

  const fetchDataForMonth = useCallback(() => {
    api.assistanceTable.getDataForMonth(date).then(setTableData);
  }, [date]);

  useEffect(() => {
    fetchDataForMonth();
  }, [date, fetchDataForMonth]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FilterbyStudentName
          value={studentNameFilter}
          onChange={setStudentNameFilter}
        />

        <SelectMonth value={date} onChange={setDate} />
      </div>

      {tableData && (
        <AssistanceTable
          date={date}
          data={{
            ...tableData,
            students: tableData.students.filter(x =>
              x.name.toLowerCase().includes(studentNameFilter.toLowerCase())
            )
          }}
          onStudentAssistanceChanged={fetchDataForMonth}
        />
      )}
    </>
  );
};

const SelectMonth = (props: {
  value: Date;
  onChange: (date: Date) => void;
}) => {
  return (
    <div style={{ maxWidth: 200, marginBottom: "1rem" }}>
      <InputName>Més Representado</InputName>
      <Input
        type="month"
        name="date"
        onChange={(_, value) => props.onChange(new Date(value))}
        value={helpers.date.format(props.value, "YYYY-MM")}
      />
    </div>
  );
};

const FilterbyStudentName = (props: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div style={{ maxWidth: 200, marginBottom: "1rem" }}>
    <InputName>Filtrar por nombre de Alumno</InputName>
    <Input
      type="text"
      name="studentName"
      onChange={(_, value) => props.onChange(value)}
      value={props.value}
    />
  </div>
);

const AssistanceTable = (props: {
  date: Date;
  data: AssistanceTableData;
  onStudentAssistanceChanged: () => void;
}) => {
  const today = new Date();

  const dateOfToday = today.getDate();

  const providedMonthIsEqualToTodayMonth =
    today.getMonth() === props.date.getMonth();

  const daysInMonth = helpers.array.incremental(
    helpers.date.getDaysInMonth(props.date),
    1
  );

  const updateAssistance = (
    dayInMonth: number,
    student: any,
    studentAssisted: boolean
  ) => {
    const date = new Date(props.date);

    date.setDate(dayInMonth);

    const yogaClass = props.data.yogaClasses.find(
      yc => yc.date.getDate() === dayInMonth
    );

    const studentIds: number[] = yogaClass ? yogaClass.studentIds : [];

    const request = studentAssisted
      ? api.assistanceTable.updateAssistance(
          studentIds.filter(sid => sid !== student.id),
          date
        )
      : api.assistanceTable.updateAssistance(
          studentIds.concat([student.id]),
          date
        );

    request.then(props.onStudentAssistanceChanged);
  };

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
          .some(yc => yc.studentIds.includes(v.id)),
      Cell: v => (
        <div
          style={{
            textAlign: "center",
            width: "100%",
            height: "100%",
            cursor: "pointer"
          }}
          onClick={() => updateAssistance(dayInMonth, v.original, v.value)}
        >
          {v.value ? "X" : " "}
        </div>
      ),
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
