import React, { useState } from "react";
import Button from "./Button";
import helpers from "../helpers";
import { Formik, FormikProps } from "formik";

type Errors = {
  [error: string]: string;
};

export class FormBuilder<T> {
  private initial: T;
  private title: string;
  private submit: (values: T) => Promise<void>;
  private cancel: () => void;
  private validate?: (values: T) => Errors;

  private components: ((props: FormikProps<T>) => JSX.Element)[] = [];

  constructor(props: {
    initial: T;
    title: string;
    submit: (values: T) => Promise<void>;
    cancel: () => void;
    validate?: (values: T) => Errors;
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
          (formikProps.errors as Errors)[props.name]
      );
      return (
        <>
          <InputTitle>{props.label}</InputTitle>
          <NewInput
            value={(formikProps.values as any)[props.name]}
            name={props.name}
            type={props.type || "text"}
            invalid={isInvalid}
            onChange={e =>
              formikProps.setFieldValue(props.name, e.target.value)
            }
          />
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
              <Title>{this.title}</Title>
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

const FormView = (props: {
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
          size="sm"
          colors={{ main: helpers.color.secondary }}
          onClick={props.onCancel}
        >
          Cancelar
        </Button>
        <Button
          size="sm"
          style={{ float: "right" }}
          colors={{ main: helpers.color.secondary }}
          onClick={props.onSubmit}
        >
          Enviar
        </Button>
      </form>
    </>
  );
};

export default FormView;

const Title = (props: { children: any }) => (
  <h1 style={{ textAlign: "center" }}>{props.children}</h1>
);

export const InputTitle = (props: { children: any }) => (
  <div style={{ color: helpers.color.secondary, fontSize: "0.8rem" }}>
    {props.children}
  </div>
);

const sharedStyle: React.CSSProperties = {
  width: "100%",
  border: "unset",
  fontSize: "1rem",
  height: "2rem",
  borderBottom: "solid 1px " + helpers.color.secondary,
  marginBottom: "1rem",
  transition: "border-bottom-color 500ms"
};
// css`
//   width: 100%;
//   border: unset;
//   font-size: 1rem;
//   height: 2rem;
//   border-bottom: solid 1px ${helpers.color.secondary};
//   margin-bottom: 1rem;
//   transition: border-bottom-color 500ms;
//   &.invalid {
//     border-bottom-color: ${helpers.color.danger};
//   }
//   &:focus {
//     outline: unset;
//     border-bottom-color: ${helpers.color.secondaryLight};
//   }
// `;

export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => <input style={sharedStyle} {...props} />;

const NewInput = (props: {
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
    marginBottom: "1rem",
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

export const Select = (
  props: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
) => <select style={{ ...sharedStyle, backgroundColor: "unset" }} {...props} />;
