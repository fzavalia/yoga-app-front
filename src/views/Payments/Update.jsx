import React, { useState, useEffect } from 'react'
import api from '../../modules/api';
import Form from './Form';

export default ({ history, match }) => {

  const [student, setStudent] = useState(undefined)

  useEffect(() => {
    api.student.show(match.params.id).then(setStudent)
  }, [])

  if (!student) {
    return null
  }

  return (
    <Form
      history={history}
      student={student}
      submitPromise={values => api.student.update(student.id, values)}
    />
  )
}