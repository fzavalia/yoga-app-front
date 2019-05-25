import React, { useState } from "react";
import Button from "./Button";
import helpers from "../helpers";
import { Formik, FormikProps } from "formik";

export type FormErrors = {
  [error: string]: string;
};

export default class FormBuilder<T> {
  private initial: T;
  private title: string;
  private submit: (values: T) => Promise<void>;
  private cancel: () => void;
  private validate?: (values: T) => FormErrors;

  private components: ((props: FormikProps<T>) => JSX.Element)[] = [];

  constructor(props: {
    initial: T;
    title: string;
    submit: (values: T) => Promise<void>;
    cancel: () => void;
    validate?: (values: T) => FormErrors;
  }) {
    this.initial = props.initial;
    this.title = props.title;
    this.submit = props.submit;
    this.cancel = props.cancel;
    this.validate = props.validate;
  }

  withInput = (props: { name: string; type?: string; label: string }) => {
    this.components.push(formikProps => {
      const isInvalid = Boolean(
        (formikProps.touched as any)[props.name] &&
          (formikProps.errors as FormErrors)[props.name]
      );
      return (
        <InputContainer>
          <InputName>{props.label}</InputName>
          <Input
            value={(formikProps.values as any)[props.name]}
            name={props.name}
            type={props.type || "text"}
            invalid={isInvalid}
            onChange={e =>
              formikProps.setFieldValue(props.name, e.target.value)
            }
          />
          <InputError show={isInvalid}>
            {(formikProps.errors as any)[props.name]}
          </InputError>
        </InputContainer>
      );
    });
    return this;
  };

  withSelect = (props: {
    name: string;
    label: string;
    options: { value: any; label: string }[];
  }) => {
    this.components.push(formikProps => {
      const isInvalid = Boolean(
        (formikProps.touched as any)[props.name] &&
          (formikProps.errors as FormErrors)[props.name]
      );
      return (
        <InputContainer>
          <InputName>{props.label}</InputName>
          <Select
            name={props.name}
            onChange={e =>
              formikProps.setFieldValue(props.name, e.target.value)
            }
            invalid={isInvalid}
            options={props.options}
            value={(formikProps.values as any)[props.name]}
          />
          <InputError show={isInvalid}>
            {(formikProps.errors as any)[props.name]}
          </InputError>
        </InputContainer>
      );
    });
    return this;
  };

  build = () => {
    return (
      <Formik
        initialValues={this.initial}
        validate={this.validate}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          this.submit(values)
            .then(this.cancel)
            .catch(() => actions.setSubmitting(false));
        }}
      >
        {formikProps => {
          return (
            <>
              <FormTitle>{this.title}</FormTitle>
              <form onSubmit={e => e.preventDefault()}>
                {this.components.map(c => c(formikProps))}
                <Button
                  size="sm"
                  colors={{ main: helpers.color.secondary }}
                  onClick={this.cancel}
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  style={{ float: "right" }}
                  colors={{ main: helpers.color.secondary }}
                  onClick={formikProps.handleSubmit}
                >
                  Enviar
                </Button>
              </form>
            </>
          );
        }}
      </Formik>
    );
  };
}

const FormTitle = (props: { children: any }) => (
  <h1 style={{ textAlign: "center" }}>{props.children}</h1>
);

const InputContainer = (props: { children: any }) => (
  <div style={{ marginBottom: "1rem" }}>{props.children}</div>
);

const InputName = (props: { children: any }) => (
  <div style={{ color: helpers.color.secondary, fontSize: "0.8rem" }}>
    {props.children}
  </div>
);

const InputError = (props: { show: boolean; children: any }) => {
  let style: React.CSSProperties = {
    opacity: 0,
    fontSize: "0.8rem",
    color: helpers.color.danger,
    transition: "opacity 500ms"
  };
  if (props.show) {
    style.opacity = 1;
  }
  return <label style={style}>{props.children}</label>;
};

const Input = (props: {
  name: string;
  type: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
}) => {
  const [isFocus, setIsFocus] = useState(false);

  let style: React.CSSProperties = {
    width: "100%",
    border: "unset",
    fontSize: "1rem",
    height: "2rem",
    borderBottom: "solid 1px " + helpers.color.secondary,
    transition: "border-bottom-color 500ms"
  };

  if (isFocus) {
    style.outline = "unset";
    style.borderBottomColor = helpers.color.secondaryLight;
  }

  if (props.invalid) {
    style.borderBottomColor = helpers.color.danger;
  }

  return (
    <input
      type={props.type}
      style={style}
      onChange={props.onChange}
      value={props.value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
};

const Select = (props: {
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: any; label: string }[];
  invalid?: boolean;
}) => {
  const [isFocus, setIsFocus] = useState(false);

  let style: React.CSSProperties = {
    width: "100%",
    border: "unset",
    fontSize: "1rem",
    height: "2rem",
    borderBottom: "solid 1px " + helpers.color.secondary,
    transition: "border-bottom-color 500ms",
    backgroundColor: "unset"
  };

  if (isFocus) {
    style.outline = "unset";
    style.borderBottomColor = helpers.color.secondaryLight;
  }

  if (props.invalid) {
    style.borderBottomColor = helpers.color.danger;
  }

  return (
    <select
      name={props.name}
      value={props.value}
      style={style}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={props.onChange}
    >
      {props.options.map((o, k) => {
        return (
          <option key={k} value={o.value}>
            {o.label}
          </option>
        );
      })}
    </select>
  );
};
