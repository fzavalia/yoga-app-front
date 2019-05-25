import { History } from "history";
import { SubmittableStudent } from "../../modules/api/apiModelRequests/StudentApiModelRequest";
import { FormBuilder, FormErrors } from "../../components/FormView";

export default (props: {
  history: History;
  title: string;
  initialValues?: SubmittableStudent;
  submit: (values: SubmittableStudent) => Promise<void>;
}) => {
  const defaultInitialValues: SubmittableStudent = {
    dni: "",
    email: "",
    name: "",
    phoneNumber: ""
  };

  const validate = (values: SubmittableStudent) => {
    const errors: FormErrors = {};
    if (!values.name) {
      errors.name = "Requerido";
    }
    return errors;
  };

  return new FormBuilder<SubmittableStudent>({
    initial: props.initialValues || defaultInitialValues,
    cancel: () => props.history.goBack(),
    submit: props.submit,
    title: props.title,
    validate
  })
    .withInput({ name: "name", label: "Nombre" })
    .withInput({ name: "email", label: "Email" })
    .withInput({ name: "phoneNumber", label: "Telefono" })
    .withInput({ name: "dni", label: "DNI" })
    .build();
};
