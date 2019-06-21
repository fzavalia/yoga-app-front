import { History } from "history";
import FormBuilder, {
  FormErrors
} from "../../components/FormBuilder/FormBuilder";
import helpers from "../../helpers";
import { useState, useEffect } from "react";
import api from "../../modules/api";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";

interface YogaClassFormValues {
  date: Date;
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
      .list({ order: { by: "name", type: OrderType.ASC } })
      .then(students => students.map(s => ({ value: s.id, label: s.name })))
      .then(setStudentOptions);
  }, []);

  if (!studentOptions) {
    return null;
  }

  const defaultInitialValues: YogaClassFormValues = {
    date: new Date(),
    selectedStudentIds: []
  };

  const validate = (values: YogaClassFormValues) => {
    const errors: FormErrors = {};
    if (!values.date) {
      errors.date = "Requerido";
    }
    return errors;
  };

  return new FormBuilder<YogaClassFormValues>({
    initial: props.initialValues || defaultInitialValues,
    cancel: () => props.history.goBack(),
    submit: props.submit,
    title: props.title,
    validate
  })
    .withDatePicker({ name: "date", label: "Fecha" })
    .withMultiSelect({
      name: "selectedStudentIds",
      label: "Alumnos",
      options: studentOptions
    })
    .build();
};
