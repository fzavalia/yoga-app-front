import ApiModelRequest from "../impl/ApiModelRequest";
import StudentRequest, { Student } from "./StudentRequest";
import helpers from "../../../helpers";

export enum PaymentType {
  CREDIT_CARD = "credit_card",
  CASH = "cash"
}

export interface Payment {
  id: number;
  amount: number;
  payedAt: Date;
  type: PaymentType;
  studentId: number;
  invoiced: boolean;
  student?: Student;
}

export interface SubmittablePayment {
  amount?: number;
  payedAt?: Date;
  type?: PaymentType;
  studentId?: number;
  invoiced?: boolean;
}

export default class PaymentRequest extends ApiModelRequest<
  Payment,
  SubmittablePayment
> {
  protected mapModelFromApi: (model: any) => Payment = model => {
    return {
      amount: model.amount,
      id: model.id,
      payedAt: new Date(model.payed_at),
      student: model.student
        ? StudentRequest.mapModelFromApi(model.student)
        : undefined,
      studentId: model.student_id,
      invoiced: model.invoiced,
      type: model.type
    };
  };

  protected mapSubmittableForApi: (
    model: SubmittablePayment
  ) => any = model => {
    const res: any = {};
    res.amount = model.amount;
    res.payed_at = model.payedAt
      ? helpers.date.format(model.payedAt, "YYYY-MM-DD")
      : undefined;
    res.student_id = model.studentId;
    res.type = model.type;
    res.invoiced = model.invoiced ? 1 : 0;
    return res;
  };
}
