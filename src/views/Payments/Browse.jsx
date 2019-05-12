import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import BrowseBase from "../../components/BrowseBase";

export default () => {

  const [studentOptions, setStudentOptions] = useState('')

  useEffect(() => {
    api.student.list()
      .then(students => students.map(student => ({ value: student.id, label: student.name })))
      .then(setStudentOptions)
  }, [])

  return (
    <BrowseBase
      title={'Pagos'}
      fetchElements={(filterValue, filterType) => api.payment.list({ where: { [filterType]: filterValue }, cover: ['student'] })}
      deleteElement={(element) => api.payment.delete(element.id)}
      updatePage={element => '/admin/payments/update/' + element.id}
      createPage={'/admin/payments/create'}
      filters={[
        { value: 'student_id', label: 'Alumno', type: 'select', options: studentOptions },
        { value: 'payed_at', label: 'Fecha', type: 'date' },
      ]}
      renderElementContent={element =>
        <div>
          <h2>{element.student.name}</h2>
          <div>Fecha: {element.payed_at}</div>
          <div>Metodo de Pago: {element.type}</div>
          <div>Cantidad: {element.amount}</div>
        </div>}
      deleteModalTitle='Eliminar Alumno'
      renderDeleteModalContent={element => <span>Desea eliminar al Alumno <b>{element.name}</b>?</span>}
    />
  )
}
