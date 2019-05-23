import ApiModelRequest from "../impl/ApiModelRequest";

export interface Student {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  dni: string;
}

export interface SubmittableStudent {
  name: string;
  phoneNumber: string;
  email: string;
  dni: string;
}

export default class StudentApiModelRequest extends ApiModelRequest<
  Student,
  SubmittableStudent
> {
  static mapModelFromApi: (model: any) => Student = model => ({
    id: model.id,
    name: model.name,
    email: model.email,
    dni: model.dni,
    phoneNumber: model.phone_number
  });

  protected mapModelFromApi = StudentApiModelRequest.mapModelFromApi;

  protected mapModelForApi = (model: SubmittableStudent) => {
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
