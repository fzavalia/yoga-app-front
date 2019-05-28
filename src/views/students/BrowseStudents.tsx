import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";
import { Student } from "../../modules/api/requests/StudentRequest";
import BrowseView from "../../components/BrowseView";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";

export default (props: { history: History }) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    api.student
      .list({ order: { by: "name", type: OrderType.ASC } })
      .then(setStudents);
  }, []);

  return (
    <BrowseView
      items={students}
      mapItem={student => ({
        title: student.name,
        props: [
          { label: "Email", value: student.email },
          { label: "Teléfono", value: student.phoneNumber },
          { label: "DNI", value: student.dni }
        ]
      })}
      onUpdateClick={student =>
        props.history.push(`/students/update/${student.id}`)
      }
      onDeleteClick={student => {
        if (window.confirm("Eliminar Alumno " + student.name)) {
          api.student
            .delete(student.id)
            .then(() => setStudents(students.filter(x => x.id !== student.id)));
        }
      }}
      onCreateClick={() => props.history.push(`/students/create`)}
    />
  );
};
