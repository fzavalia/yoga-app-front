import React from "react";
import FormView, { InputTitle, Input } from "../../../components/FormView";

export default (props: {
  title: string;
  name: string;
  email: string;
  phoneNumber: string;
  dni: string;
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
      <InputTitle>Nombre</InputTitle>
      <Input name="name" value={props.name} onChange={props.onChange} />
      <InputTitle>Email</InputTitle>
      <Input
        name="email"
        type="email"
        value={props.email}
        onChange={props.onChange}
      />
      <InputTitle>Telefono</InputTitle>
      <Input
        name="phoneNumber"
        type="tel"
        value={props.phoneNumber}
        onChange={props.onChange}
      />
      <InputTitle>DNI</InputTitle>
      <Input name="dni" value={props.dni} onChange={props.onChange} />
    </FormView>
  );
};
