import React from "react";
import { History } from "history";
import { Formik } from "formik";
import FormView from "./FormView";
import {
  SubmittablePayment,
  PaymentType
} from "../../../modules/api/apiModelRequests/PaymentApiModelRequest";

export interface PaymentFormValues {
  amount: number;
  type: PaymentType;
  payedAt?: string;
  studentId?: number;
}

export default (props: {
  history: History;
  title: string;
  initialValues?: PaymentFormValues;
  studentOptions: { value: number; label: string }[];
  submit: (values: SubmittablePayment) => Promise<void>;
}) => {
  return (
    <Formik
      initialValues={
        props.initialValues || {
          amount: 0,
          payedAt: undefined,
          studentId: undefined,
          type: PaymentType.CASH
        }
      }
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        console.log(values);
        props
          .submit({
            amount: values.amount,
            payedAt: values.payedAt ? new Date(values.payedAt) : new Date(),
            studentId: values.studentId ? values.studentId : -1,
            type: values.type
          })
          .then(props.history.goBack)
          .catch(() => actions.setSubmitting(false));
      }}
    >
      {formikProps => {
        const { amount, payedAt, studentId, type } = formikProps.values;

        return (
          <FormView
            amount={amount}
            payedAt={payedAt}
            studentId={studentId}
            type={type}
            title={props.title}
            studentOptions={props.studentOptions}
            onCancel={props.history.goBack}
            onChange={(name, value) => formikProps.handleChange(name)(value)}
            onSubmit={formikProps.handleSubmit}
          />
        );
      }}
    </Formik>
  );
};
