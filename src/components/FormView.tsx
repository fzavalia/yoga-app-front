import React from "react";
import styled, { css } from "styled-components";
import Button from "./Button";
import helpers from "../helpers";

export default (props: {
  title: string;
  children: any;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  return (
    <>
      <Title>{props.title}</Title>
      <form onSubmit={e => e.preventDefault()}>
        {props.children}
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

export const InputTitle = styled.div`
  color: ${helpers.color.secondary}
  font-size: 0.8rem;
`;

const sharedStyle = css`
  width: 100%;
  border: unset;
  font-size: 1rem;
  height: 2rem;
  border-bottom: solid 1px ${helpers.color.secondary};
  margin-bottom: 1rem;
  transition: border-bottom-color 500ms;
  &.invalid {
    border-bottom-color: ${helpers.color.danger};
  }
  &:focus {
    outline: unset;
    border-bottom-color: ${helpers.color.secondaryLight};
  }
`;

export const Input = styled.input`
  ${sharedStyle}
`;

export const Select = styled.select`
  ${sharedStyle}
  background-color: unset;
`;
