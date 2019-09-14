import ApiModelRequest from "../impl/ApiModelRequest";
import PaymentRequest, { Payment } from "./PaymentRequest";

export interface Student {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  dni: string;
  payments: Payment[]
}

export interface SubmittableStudent {
  name: string;
  phoneNumber: string;
  email: string;
  dni: string;
}

export default class StudentRequest extends ApiModelRequest<
  Student,
  SubmittableStudent
  > {
  static mapModelFromApi: (model: any) => Student = model => ({
    id: model.id,
    name: model.name,
    email: model.email,
    dni: model.dni,
    phoneNumber: model.phone_number,
    payments: model.payments ? model.payments.map(PaymentRequest.mapModelFromApi) : []
  });

  protected mapModelFromApi = StudentRequest.mapModelFromApi;

  protected mapSubmittableForApi = (model: SubmittableStudent) => {
    const res: any = {};
    if (model.phoneNumber) {
      res.phone_number = model.phoneNumber;
    }
    if (model.email) {
      res.email = model.email;
    }
    if (model.dni) {
      res.dni = model.dni;
    }
    res.name = model.name;
    return res;
  };
}
