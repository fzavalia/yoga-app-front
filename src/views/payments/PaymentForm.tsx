import { History } from "history";
import {
  SubmittablePayment,
  PaymentType
} from "../../modules/api/apiModelRequests/PaymentApiModelRequest";
import FormBuilder, { FormErrors } from "../../components/FormBuilder/FormBuilder";
import { useState, useEffect } from "react";
import api from "../../modules/api";
import helpers from "../../helpers";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";

interface PaymentFormValues {
  amount: number;
  payedAt: string;
  invoiced: boolean;
  type?: PaymentType;
  studentId?: number;
}

interface PaymentFormProps {
  history: History;
  title: string;
  initialValues?: PaymentFormValues;
  submit: (values: SubmittablePayment) => Promise<void>;
}

export default (props: PaymentFormProps) => {
  const [studentOptions, setStudentOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    api.student
      .list({ order: { by: "name", type: OrderType.ASC } })
      .then(students =>
        students.map(student => ({ value: student.id, label: student.name }))
      )
      .then(setStudentOptions);
  }, []);

  const defaultInitialValues: PaymentFormValues = {
    amount: 0,
    payedAt: helpers.date.formatForInput(new Date()),
    studentId: undefined,
    type: undefined,
    invoiced: false
  };

  const submit = (values: PaymentFormValues) => {
    const mapped: SubmittablePayment = {
      amount: values.amount,
      payedAt: new Date(values.payedAt),
      studentId: values.studentId || -1,
      type: values.type || PaymentType.CASH,
      invoiced: values.invoiced
    };
    return props.submit(mapped);
  };

  const validate = (values: PaymentFormValues) => {
    const errors: FormErrors = {};
    if (!values.payedAt) {
      errors.payedAt = "Requerido";
    }
    if (!values.studentId) {
      errors.studentId = "Requerido";
    }
    if (!values.type) {
      errors.type = "Requerido";
    }
    if (values.amount <= 0) {
      errors.amount = "Mayor a 0";
    }
    return errors;
  };

  return new FormBuilder<PaymentFormValues>({
    initial: props.initialValues || defaultInitialValues,
    cancel: () => props.history.goBack(),
    title: props.title,
    submit,
    validate
  })
    .withInput({ name: "amount", type: "number", label: "Cantidad" })
    .withInput({ name: "payedAt", type: "date", label: "Fecha del Pago" })
    .withSelect({
      name: "studentId",
      label: "Alumno",
      options: studentOptions
    })
    .withSelect({
      name: "type",
      label: "Metodo de Pago",
      options: [
        { value: PaymentType.CREDIT_CARD, label: "Tarjeta" },
        { value: PaymentType.CASH, label: "Efectivo" }
      ]
    })
    .withCheckbox({ name: "invoiced", label: "Facturado" })
    .build();
};
