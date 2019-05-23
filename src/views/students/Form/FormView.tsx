import React from "react";
import styled from "styled-components";
import helpers from "../../../helpers";
import Button from "../../../components/Button";

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
    <>
      <Title>{props.title}</Title>
      <form onSubmit={e => e.preventDefault()}>
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
        <Button
          className="sm"
          colors={{ main: helpers.color.secondary }}
          onClick={props.onCancel}
        >
          Cancelar
        </Button>
        <Button
          style={{ float: "right" }}
          className="sm"
          colors={{ main: helpers.color.secondary }}
          onClick={props.onSubmit}
        >
          Enviar
        </Button>
      </form>
    </>
  );
};

const Title = styled.h1`
  text-align: center;
`;

const InputTitle = styled.div`
  color: ${helpers.color.secondary}
  font-size: 0.8rem;
`;

const Input = styled.input`
  width: 100%;
  border: unset;
  font-size: 1rem;
  height: 2rem;
  border-bottom: solid 1px ${helpers.color.secondary};
  margin-bottom: 1rem;
  transition: border-bottom-color 500ms;
  &.invalid {
    border-bottom-color: ${helpers.color.danger}
  }
  &:focus {
    outline: unset
    border-bottom-color: ${helpers.color.secondaryLight};
  }
`;
