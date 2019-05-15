import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";

export default (props: { history: History }) => {

  const [students, setStudents] = useState<any>([])

  useEffect(() => {
    api.student.list().then(setStudents)
  }, [])

  return (
    <>
      <h1>Alumnos</h1>
      <ul>
        {students.map((student: any) =>
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
              <button onClick={() => props.history.push(`/students/${student.id}/update`)}>Editar</button>
              <button>Borrar</button>
            </section>
          </li>)}
      </ul>
    </>
  )
}