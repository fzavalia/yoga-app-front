import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";
import { Student } from "../../modules/api/apiModelRequests/StudentApiModelRequest";
import styled from "styled-components";
import Button from "../../components/Button";
import helpers from "../../helpers";

export default (props: { history: History }) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    api.student.list().then(setStudents);
  }, []);

  return (
    <BrowseView
      students={students}
      onUpdateStudentClick={student =>
        props.history.push(`/students/update/${student.id}`)
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
  <Container>
    <CreateButton onClick={props.onCreateStudentClick} />
    <ul>
      {props.students.map((student: any) => (
        <Item key={student.id}>
          <h3>{student.name}</h3>
          <section>
            <ItemValue>
              <span>Email: </span>
              <span>{student.email}</span>
            </ItemValue>
            <ItemValue>
              <span>Telefono: </span>
              <span>{student.phone_number}</span>
            </ItemValue>
            <ItemValue>
              <span>DNI: </span>
              <span>{student.dni}</span>
            </ItemValue>
          </section>
          <br />
          <ItemButtonsContainer>
            <ItemButton onClick={() => props.onUpdateStudentClick(student)}>
              Editar
            </ItemButton>
            <ItemButton onClick={() => props.onDeleteStudentClick(student)}>
              Borrar
            </ItemButton>
          </ItemButtonsContainer>
        </Item>
      ))}
    </ul>
  </Container>
);

const Container = styled.section`
  position: relative;
  padding: 1rem;
  max-width: 500px;
  margin: auto;
`;

const CreateButton = (props: { onClick: () => void }) => (
  <Button
    style={{ width: "100%" }}
    onClick={props.onClick}
    colors={{
      main: helpers.color.secondary,
      selected: helpers.color.secondaryLight
    }}
  >
    Crear
  </Button>
);

const Item = styled.li`
  padding: 0 0 1rem;
  border-bottom: solid 1px;
`;

const ItemValue = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemButtonsContainer = styled.div`
  text-align: right;
`;

const ItemButton = (props: { onClick: () => void; children: any }) => (
  <Button
    className="sm"
    style={{ marginLeft: "1rem" }}
    colors={{ main: helpers.color.secondary }}
    onClick={props.onClick}
  >
    {props.children}
  </Button>
);
