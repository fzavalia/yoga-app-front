import React from "react";
import { History } from "history";
import { Formik } from "formik";
import FormView from "./FormView";

interface SubmitableStudent {
  name: string;
  email: string;
  phoneNumber: string;
  dni: string;
}

interface FormProps {
  history: History;
  title: string;
  submit: (values: SubmitableStudent) => Promise<void>;
}

export default (props: FormProps) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",
        dni: ""
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        props
          .submit(values)
          .then(() => {})
          .catch(() => actions.setSubmitting(false));
      }}
    >
      {formikProps => {
        const { name, email, phoneNumber, dni } = formikProps.values;

        return (
          <FormView
            name={name}
            phoneNumber={phoneNumber}
            email={email}
            dni={dni}
            title={props.title}
            onCancel={props.history.goBack}
            onChange={(name, value) => formikProps.handleChange(name)(value)}
          />
        );
      }}
    </Formik>
  );
};
