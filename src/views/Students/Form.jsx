import React from 'react'
import { Formik } from 'formik'
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback
} from 'reactstrap'
import validate from '../../helpers/validate';
import AdminViewContainer from '../../components/AdminViewContainer';

export default ({
  history,
  student = { name: '', email: '', phoneNumber: '', dni: '' },
  submitPromise,
}) => {
  return (
    <Formik
      initialValues={student}
      validate={values => {
        const errors = {}
        if (!values.name) errors.name = 'Requerido'
        if (values.email && !validate.email(values.email)) errors.email = 'Debe ingresar un email valido'
        return errors
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true)
        submitPromise(values)
          .then(history.goBack)
          .finally(() => actions.setSubmitting(false))
      }}
      render={props =>
        <AdminViewContainer title='Nuevo Alumno'>
          <Form>
            <FormikInput formikProps={props} name='name' label='Nombre' />
            <FormikInput formikProps={props} name='email' label='Email' />
            <FormikInput formikProps={props} name='phoneNumber' label='Telefono' inputProps={{ type: 'number' }} />
            <FormikInput formikProps={props} name='dni' label='DNI' inputProps={{ type: 'number' }} />
            <Button disabled={props.isSubmitting} onClick={history.goBack}>Cancelar</Button>
            <Button disabled={props.isSubmitting} onClick={props.handleSubmit} color='info'>Enviar</Button>
          </Form>
        </AdminViewContainer>}
    />
  )
}

const FormikInput = ({ formikProps, label, name, inputProps = {} }) =>
  <FormGroup>
    <Label>{label}</Label>
    <Input
      invalid={formikProps.errors[name]}
      onChange={e => formikProps.handleChange(name)(e.target.value)}
      value={formikProps.values[name]}
      {...inputProps}
    />
    <FormFeedback>{formikProps.errors[name]}</FormFeedback>
  </FormGroup>