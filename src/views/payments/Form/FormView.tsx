import React from "react";
import { PaymentType } from "../../../modules/api/apiModelRequests/PaymentApiModelRequest";

export default (props: {
  title: string;
  studentOptions: { value: number; label: string }[];
  amount: number;
  payedAt?: string;
  studentId?: number;
  type: PaymentType;
  onChange: (inputName: string, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  return (
    <>
      <h3>{props.title}</h3>
      <form onSubmit={e => e.preventDefault()}>
        Cantidad
        <br />
        <input
          name="amount"
          value={props.amount}
          type="number"
          onChange={e => props.onChange(e.target.name, e.target.value)}
        />
        <br />
        Fecha del Pago
        <br />
        <input
          name="payedAt"
          type="date"
          value={props.payedAt}
          onChange={e => props.onChange(e.target.name, e.target.value)}
        />
        <br />
        Alumno
        <br />
        <select
          name="studentId"
          value={props.studentId}
          onChange={e => props.onChange(e.target.name, e.target.value)}
        >
          <option value={undefined} />
          {props.studentOptions.map(x => (
            <option key={x.value} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>
        <br />
        Metodo de Pago
        <br />
        <select
          name="type"
          value={props.type}
          onChange={e => props.onChange(e.target.name, e.target.value)}
        >
          <option value={PaymentType.CASH}>Efectivo</option>
          <option value={PaymentType.CREDIT_CARD}>Tarjeta</option>
        </select>
        <br />
        <br />
        <button type="button" onClick={props.onCancel}>
          Cancelar
        </button>
        <button type="submit" onClick={props.onSubmit}>
          Enviar
        </button>
      </form>
    </>
  );
};
