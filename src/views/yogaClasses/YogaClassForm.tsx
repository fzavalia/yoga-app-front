import { History } from "history";
import FormBuilder from "../../components/FormBuilder";
import helpers from "../../helpers";
import { useState, useEffect } from "react";
import api from "../../modules/api";
import { FormErrors } from "../../components/FormBuilder/FormBuilder";

interface YogaClassFormValues {
  date: string;
  selectedStudentIds: number[];
}

export default (props: {
  history: History;
  title: string;
  initialValues?: YogaClassFormValues;
  submit: (values: YogaClassFormValues) => Promise<void>;
}) => {
  const [studentOptions, setStudentOptions] = useState<
    { value: number; label: string }[] | undefined
  >();

  useEffect(() => {
    api.student
      .list()
      .then(students => students.map(s => ({ value: s.id, label: s.name })))
      .then(setStudentOptions);
  }, []);

  if (!studentOptions) {
    return null;
  }

  const defaultInitialValues: YogaClassFormValues = {
    date: helpers.date.formatForInput(new Date()),
    selectedStudentIds: []
  };

  return new FormBuilder<YogaClassFormValues>({
    initial: props.initialValues || defaultInitialValues,
    cancel: () => props.history.goBack(),
    submit: props.submit,
    title: props.title,
    validate: values => {
      const errors: FormErrors = {};
      if (!values.date) {
        errors.date = "Requerido";
      }
      return errors;
    }
  })
    .withInput({ name: "date", type: "date", label: "Fecha" })
    .withMultiSelect({
      name: "selectedStudentIds",
      label: "Alumnos",
      options: studentOptions
    })
    .build();
};
