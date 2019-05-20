import ApiModelRequest from "../impl/ApiModelRequest";
import StudentApiModelRequest, { Student } from "./StudentApiModelRequest";

export enum PaymentType {
  CARD,
  CASH
}

export interface Payment {
  id: number;
  amount: number;
  payedAt: Date;
  type: PaymentType;
  student: Student;
}

export interface SubmittablePayment {
  amount: number;
  payedAt: Date;
  type: PaymentType;
  studentId: number;
}

export default class PaymentApiModelRequest extends ApiModelRequest<
  Payment,
  SubmittablePayment
> {
  protected mapModelFromApi: (model: any) => Payment = model => ({
    ...model,
    payedAt: new Date(model.payedAt),
    student: StudentApiModelRequest.mapModelFromApi(model.student),
    type: model.type === "cash" ? PaymentType.CASH : PaymentType.CARD
  });

  protected mapModelForApi: (model: SubmittablePayment) => any = model => ({
    ...model,
    payed_at: model.payedAt.toDateString(),
    type: model.type === PaymentType.CASH ? "cash" : "card",
    student_id: model.studentId
  });
}
