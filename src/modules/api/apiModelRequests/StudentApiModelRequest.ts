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
    ...model,
    phoneNumber: model.phone_number
  });

  protected mapModelFromApi: (model: any) => Student = model => ({
    ...model,
    phoneNumber: model.phone_number
  });

  protected mapModelForApi = StudentApiModelRequest.mapModelFromApi;
}
