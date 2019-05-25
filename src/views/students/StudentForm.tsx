import { History } from "history";
import { SubmittableStudent } from "../../modules/api/apiModelRequests/StudentApiModelRequest";
import { FormBuilder } from "../../components/FormView";

export default (props: {
  history: History;
  title: string;
  initialValues?: SubmittableStudent;
  submit: (values: SubmittableStudent) => Promise<void>;
}) => {
  return new FormBuilder<SubmittableStudent>({
    initial: props.initialValues || { dni: "", email: "", name: "", phoneNumber: "" },
    cancel: () => props.history.goBack(),
    submit: props.submit,
    title: props.title
  })
    .withInput({ name: "name", type: "text", label: "Nombre" })
    .withInput({ name: "email", type: "text", label: "Email" })
    .withInput({ name: "phoneNumber", type: "text", label: "Telefono" })
    .withInput({ name: "dni", type: "text", label: "DNI" })
    .build();
};
