import React from "react";
import api from "../../modules/api";
import BrowseBase from "../../components/BrowseBase";

export default () =>
  <BrowseBase
    title={'Alumnos'}
    fetchElements={(filterValue, filterType) => api.student.list({ where: { [filterType]: filterValue } })}
    deleteElement={(element) => api.student.delete(element.id)}
    updatePage={element => '/admin/students/update/' + element.id}
    createPage={'/admin/students/create'}
    filters={[
      { value: 'name', label: 'Nombre' },
      { value: 'phone_number', label: 'Telefono' },
      { value: 'email', label: 'Email' },
      { value: 'dni', label: 'DNI' },
    ]}
    renderElementContent={element =>
      <div>
        <h2>{element.name}</h2>
        <div>Email: {element.email}</div>
        <div>Telefono: {element.phoneNumber}</div>
        <div>DNI: {element.dni}</div>
      </div>}
    deleteModalTitle='Eliminar Alumno'
    renderDeleteModalContent={element => <span>Desea eliminar al Alumno <b>{element.name}</b>?</span>}
  />