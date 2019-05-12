import React from 'react'
import Form from './Form';
import api from '../../modules/api';

export default ({ history }) =>
  <Form
    history={history}
    submitPromise={values => api.student.create(values)}
  />