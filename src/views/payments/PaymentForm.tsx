import { History } from "history";
import {
  SubmittablePayment,
  PaymentType
} from "../../modules/api/apiModelRequests/PaymentApiModelRequest";
import FormBuilder, { FormErrors } from "../../components/FormBuilder";

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
  const defaultInitialValues: PaymentFormValues = {
    amount: 0,
    payedAt: undefined,
    studentId: undefined,
    type: PaymentType.CASH
  };

  const validate = (values: PaymentFormValues) => {
    const errors: FormErrors = {};
    return errors;
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
    validate
  })
    .withInput({ name: "amount", type: "number", label: "Cantidad" })
    .withInput({ name: "payedAt", type: "date", label: "Fecha del Pago" })
    .withSelect({
      name: "studentId",
      label: "Alumno",
      options: props.studentOptions
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
