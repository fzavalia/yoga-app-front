import React from "react";

export default (props: {
  title: string;
  name: string;
  email: string;
  phoneNumber: string;
  dni: string;
  onChange: (inputName: string, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  return (
    <>
      <h3>{props.title}</h3>
      <form onSubmit={e => e.preventDefault()}>
        Nombre
        <br />
        <input
          name="name"
          value={props.name}
          onChange={e => props.onChange(e.target.name, e.target.value)}
        />
        <br />
        Email
        <br />
        <input
          name="email"
          type="email"
          value={props.email}
          onChange={e => props.onChange(e.target.name, e.target.value)}
        />
        <br />
        Telefono
        <br />
        <input
          name="phoneNumber"
          type="tel"
          value={props.phoneNumber}
          onChange={e => props.onChange(e.target.name, e.target.value)}
        />
        <br />
        DNI
        <br />
        <input
          name="dni"
          value={props.dni}
          onChange={e => props.onChange(e.target.name, e.target.value)}
        />
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
