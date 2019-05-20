import ApiModelRequest from "./ApiModelRequest";

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

export default class StudentModelRequest extends ApiModelRequest<
  Student,
  SubmittableStudent
> {
  protected mapModelFromApi: (model: any) => Student = model => ({
    ...model,
    phoneNumber: model.phone_number
  });

  protected mapModelForApi: (model: SubmittableStudent) => any = model => ({
    ...model,
    phone_number: model.phoneNumber
  });
}
