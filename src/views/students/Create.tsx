import React from 'react'
import Form from './Form';
import { History } from 'history';

export default (props: { history: History }) => {
  return  <Form title='Crear Alumno' history={props.history} submit={_ => Promise.resolve()}/>
}
