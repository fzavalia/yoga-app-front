import React from 'react'
import { Formik } from 'formik'
import {
  Form, FormGroup, Input, Label, Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  FormFeedback
} from 'reactstrap'
import Header from "components/Headers/Header.jsx";
import api from '../../modules/api';
import validate from '../../helpers/validate';

export default ({ history }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phoneNumber: '',
        dni: ''
      }}
      validate={values => {
        const errors = {}
        if (!values.name) errors.name = 'Requerido'
        if (values.email && !validate.email(values.email)) errors.email = 'Debe ingresar un email valido'
        return errors
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true)
        api.student.create(values)
          .then(history.goBack)
          .finally(() => actions.setSubmitting(false))
      }}
      render={props =>
        <>
          <Header />
          <Container className=" mt--7" fluid>
            <Row>
              <div className=" col">
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Nuevo Alumno</h3>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <FormikInput formikProps={props} name='name' label='Nombre' />
                      <FormikInput formikProps={props} name='email' label='Email' />
                      <FormikInput formikProps={props} name='phoneNumber' label='Telefono' inputProps={{ type: 'number' }} />
                      <FormikInput formikProps={props} name='dni' label='DNI' inputProps={{ type: 'number' }} />
                      <Button disabled={props.isSubmitting} onClick={history.goBack}>Cancelar</Button>
                      <Button disabled={props.isSubmitting} onClick={props.handleSubmit} color='info'>Enviar</Button>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Row>
          </Container>
        </>
      }
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