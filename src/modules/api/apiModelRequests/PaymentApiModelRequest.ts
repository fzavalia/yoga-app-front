import ApiModelRequest from "../impl/ApiModelRequest";
import StudentApiModelRequest, { Student } from "./StudentApiModelRequest";

export enum PaymentType {
  CREDIT_CARD = 'credit_card',
  CASH = 'cash'
}

export interface Payment {
  id: number;
  amount: number;
  payedAt: Date;
  type: PaymentType;
  studentId: number;
  student?: Student;
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
    payedAt: new Date(model.payed_at),
    student: model.student
      ? StudentApiModelRequest.mapModelFromApi(model.student)
      : undefined,
    type: model.type === "cash" ? PaymentType.CASH : PaymentType.CREDIT_CARD
  });

  protected mapModelForApi: (model: SubmittablePayment) => any = model => {
    const res: any = {};
    res.amount = model.amount;
    res.payed_at = model.payedAt;
    res.student_id = model.studentId;
    res.type = model.type;
    return res;
  };
}
