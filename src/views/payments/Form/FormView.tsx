import React from "react";
import { PaymentType } from "../../../modules/api/apiModelRequests/PaymentApiModelRequest";
import FormView, {
  InputTitle,
  Input,
  Select
} from "../../../components/FormView";

export default (props: {
  title: string;
  studentOptions: { value: number; label: string }[];
  amount: number;
  payedAt?: string;
  studentId?: number;
  type: PaymentType;
  onChange: (e: React.ChangeEvent<any>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  return (
    <FormView
      title={props.title}
      onCancel={props.onCancel}
      onSubmit={props.onSubmit}
    >
      <InputTitle>Cantidad</InputTitle>
      <Input
        name="amount"
        value={props.amount}
        type="number"
        onChange={props.onChange}
      />
      <InputTitle>Fecha del Pago</InputTitle>
      <Input
        name="payedAt"
        type="date"
        value={props.payedAt}
        onChange={props.onChange}
      />
      <InputTitle>Alumno</InputTitle>
      <Select
        name="studentId"
        value={props.studentId}
        onChange={props.onChange}
      >
        <option value={undefined} />
        {props.studentOptions.map(x => (
          <option key={x.value} value={x.value}>
            {x.label}
          </option>
        ))}
      </Select>
      <InputTitle>Metodo de Pago</InputTitle>
      <Select name="type" value={props.type} onChange={props.onChange}>
        <option value={PaymentType.CASH}>Efectivo</option>
        <option value={PaymentType.CREDIT_CARD}>Tarjeta</option>
      </Select>
      <br />
      <br />
    </FormView>
  );
};
