import React from "react";
import { History } from "history";
import { Formik } from "formik";
import FormView from "./FormView";
import { SubmittableStudent } from "../../../modules/api/apiModelRequests/StudentApiModelRequest";
import { SubmittableYogaClass } from "../../../modules/api/apiModelRequests/YogaClassApiModelRequest";

interface YogaClassFormValues {
  date: 
}

export default (props: {
  history: History;
  title: string;
  initialValues?: SubmittableYogaClass;
  submit: (values: SubmittableStudent) => Promise<void>;
}) => {
  return (
    <Formik
      initialValues={
        props.initialValues || {
          name: "",
          email: "",
          phoneNumber: "",
          dni: ""
        }
      }
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        props
          .submit(values)
          .then(props.history.goBack)
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
            onChange={formikProps.handleChange}
            onSubmit={formikProps.handleSubmit}
          />
        );
      }}
    </Formik>
  );
};
