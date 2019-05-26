import { History } from "history";
import { SubmittableStudent } from "../../modules/api/apiModelRequests/StudentApiModelRequest";
import FormBuilder, { FormErrors } from "../../components/FormBuilder";
import helpers from "../../helpers";
import { useState, useEffect } from "react";
import api from "../../modules/api";

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
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    api.student
      .list()
      .then(students => students.map(s => ({ value: s.id, label: s.name })))
      .then(setStudentOptions);
  }, []);

  const defaultInitialValues: YogaClassFormValues = {
    date: helpers.date.formatForInput(new Date()),
    selectedStudentIds: []
  };

  return new FormBuilder<YogaClassFormValues>({
    initial: props.initialValues || defaultInitialValues,
    cancel: () => props.history.goBack(),
    submit: props.submit,
    title: props.title
  })
    .withInput({ name: "date", type: "date", label: "Fecha" })
    .withMultiSelect({
      name: "selectedStudentIds",
      label: "Alumnos",
      options: studentOptions
    })
    .build();
};
