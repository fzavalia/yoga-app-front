import React from "react";
import Button from "../Button";
import helpers from "../../helpers";
import { Formik, FormikProps } from "formik";
import MultiSelect from "./MultiSelect";
import Select, { SelectOption } from "./Select";
import Checkbox from "./Checkbox";
import Input from "./Input";

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
          <InputContainer horizontal>
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

  private isInvalid = (formikProps: FormikProps<T>, props: { name: string }) =>
    Boolean(
      (formikProps.touched as any)[props.name] &&
        (formikProps.errors as FormErrors)[props.name]
    );
}

const FormTitle = (props: { children: any }) => (
  <h1 style={{ textAlign: "center" }}>{props.children}</h1>
);

const InputContainer = (props: { children: any; horizontal?: boolean }) => {
  const style: React.CSSProperties = {
    marginBottom: "1rem"
  };
  if (props.horizontal) {
    style.display = "flex";
    style.justifyContent = "space-between";
    style.alignItems = "center";
  }
  return <div style={style}>{props.children}</div>;
};

const InputName = (props: { children: any }) => (
  <div style={{ color: helpers.color.secondary, fontSize: "0.8rem" }}>
    {props.children}
  </div>
);

const InputError = (props: { show: boolean; children: any }) => {
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
