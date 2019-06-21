import React from "react";
import Button from "../Button";
import helpers from "../../helpers";
import { Formik, FormikProps } from "formik";
import MultiSelect from "./MultiSelect";
import Select, { SelectOption } from "./Select";
import Checkbox from "./Checkbox";
import Input, { makeInputStyle } from "./Input";
import DatePicker from "react-datepicker";
import { any } from "prop-types";

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
      const isInvalid = this.isInvalid(formikProps, props);
      return (
        <InputContainer>
          <InputName>{props.label}</InputName>
          <Input
            value={(formikProps.values as any)[props.name]}
            name={props.name}
            type={props.type || "text"}
            invalid={isInvalid}
            onChange={formikProps.setFieldValue}
          />
          <InputError show={isInvalid}>
            {(formikProps.errors as any)[props.name]}
          </InputError>
        </InputContainer>
      );
    });
    return this;
  };

  withDatePicker = (props: { name: string; label: string }) => {
    this.components.push(formikProps => {
      const isInvalid = this.isInvalid(formikProps, props);
      return (
        <InputContainer>
          <InputName>{props.label}</InputName>
          <DatePicker
            selected={(formikProps.values as any)[props.name]}
            onChange={date => formikProps.setFieldValue(props.name, date)}
            customInput={<DatePickerInput />}
            dateFormat='dd/MM/yyyy'
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
    options: SelectOption[];
  }) => {
    this.components.push(formikProps => {
      const isInvalid = this.isInvalid(formikProps, props);
      return (
        <InputContainer>
          <InputName>{props.label}</InputName>
          <Select
            name={props.name}
            onChange={formikProps.setFieldValue}
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

  withMultiSelect = (props: {
    name: string;
    label: string;
    options: SelectOption[];
  }) => {
    this.components.push(formikProps => {
      const isInvalid = this.isInvalid(formikProps, props);
      return (
        <InputContainer>
          <InputName>{props.label}</InputName>
          <MultiSelect
            name={props.name}
            onChange={formikProps.setFieldValue}
            values={(formikProps.values as any)[props.name]}
            invalid={isInvalid}
            options={props.options}
          />
          <InputError show={isInvalid}>
            {(formikProps.errors as any)[props.name]}
          </InputError>
        </InputContainer>
      );
    });
    return this;
  };

  withCheckbox = (props: { name: string; label: string }) => {
    this.components.push(formikProps => {
      const isInvalid = this.isInvalid(formikProps, props);
      return (
        <>
          <InputContainer
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <InputName>{props.label}</InputName>
            <Checkbox
              name={props.name}
              onChange={formikProps.setFieldValue}
              value={(formikProps.values as any)[props.name]}
              invalid={isInvalid}
            />
          </InputContainer>
          <InputError show={isInvalid}>
            {(formikProps.errors as any)[props.name]}
          </InputError>
        </>
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
                {this.components.map((c, i) => (
                  <div key={i}>{c(formikProps)}</div>
                ))}
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

  private isInvalid = (formikProps: FormikProps<T>, props: { name: string }) =>
    Boolean(
      (formikProps.touched as any)[props.name] &&
        (formikProps.errors as FormErrors)[props.name]
    );
}

const FormTitle = (props: { children: any }) => (
  <h1 style={{ textAlign: "center", color: helpers.color.secondaryDark }}>
    {props.children}
  </h1>
);

export const InputContainer = (props: {
  children: any;
  style?: React.CSSProperties;
}) => {
  let style: React.CSSProperties = {
    marginBottom: "1rem"
  };
  if (props.style) {
    style = { ...style, ...props.style };
  }
  return <div style={style}>{props.children}</div>;
};

export const InputName = (props: { children: any }) => (
  <div style={{ color: helpers.color.secondary, fontSize: "0.8rem" }}>
    {props.children}
  </div>
);

export const InputError = (props: { show: boolean; children: any }) => {
  let style: React.CSSProperties = {
    display: "none",
    opacity: 0,
    fontSize: "0.8rem",
    color: helpers.color.danger,
    transition: "opacity 500ms"
  };
  if (props.show) {
    style.opacity = 1;
    style.display = "inline-block";
  }
  return <label style={style}>{props.children}</label>;
};

const DatePickerInput = (props: any) => {
  return (
    <Button
      onClick={props.onClick}
      colors={{ main: helpers.color.secondary, selected: helpers.color.secondaryLight }}
      style={{marginTop: 10}}
    >
      {props.value}
    </Button>
  );
};
