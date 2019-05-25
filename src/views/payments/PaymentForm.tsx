import { History } from "history";
import {
  SubmittablePayment,
  PaymentType
} from "../../modules/api/apiModelRequests/PaymentApiModelRequest";
import FormBuilder from "../../components/FormBuilder";
import { useState, useEffect } from "react";
import api from "../../modules/api";

interface PaymentFormValues {
  amount: number;
  type: PaymentType;
  payedAt?: string;
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
      .list()
      .then(students =>
        students.map(student => ({ value: student.id, label: student.name }))
      )
      .then(setStudentOptions);
  }, []);

  const defaultInitialValues: PaymentFormValues = {
    amount: 0,
    type: PaymentType.CASH
  };

  const submit = (values: PaymentFormValues) => {
    const mapped: SubmittablePayment = {
      amount: values.amount,
      payedAt: values.payedAt ? new Date(values.payedAt) : new Date(),
      studentId: values.studentId ? values.studentId : -1,
      type: values.type
    };
    return props.submit(mapped);
  };

  return new FormBuilder<PaymentFormValues>({
    initial: props.initialValues || defaultInitialValues,
    cancel: () => props.history.goBack(),
    title: props.title,
    submit,
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
    .build();
};
