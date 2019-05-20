import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";
import { Student } from "../../modules/api/impl/StudentModelRequest";

export default (props: { history: History }) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    api.student.list().then(setStudents);
  }, []);

  return (
    <BrowseView
      students={students}
      onUpdateStudentClick={student =>
        props.history.push(`/students/${student.id}/update`)
      }
      onDeleteStudentClick={student => {
        if (window.confirm("Eliminar Alumno " + student.name)) {
          api.student
            .delete(student.id)
            .then(() => setStudents(students.filter(x => x.id !== student.id)));
        }
      }}
      onCreateStudentClick={() => props.history.push(`/students/create`)}
    />
  );
};

const BrowseView = (props: {
  students: Student[];
  onCreateStudentClick: () => void;
  onUpdateStudentClick: (student: Student) => void;
  onDeleteStudentClick: (student: Student) => void;
}) => (
  <>
    <h1>Alumnos</h1>
    <button onClick={props.onCreateStudentClick}>Crear</button>
    <ul>
      {props.students.map((student: any) => (
        <li key={student.id}>
          <h3>{student.name}</h3>
          <section>
            Email: {student.email}
            <br />
            Telefono: {student.phone_number}
            <br />
            DNI: {student.dni}
          </section>
          <section>
            <button onClick={() => props.onUpdateStudentClick(student)}>
              Editar
            </button>
            <button onClick={() => props.onDeleteStudentClick(student)}>
              Borrar
            </button>
          </section>
        </li>
      ))}
    </ul>
  </>
);
