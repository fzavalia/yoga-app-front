import ApiModelRequest from "../impl/ApiModelRequest";
import StudentRequest, { Student } from "./StudentRequest";
import helpers from "../../../helpers";
import { Method } from "../core/HttpClient";
import { WhereBetween, Where, WhereRelation } from "../core/QueryStringBuilder";

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

export interface PaymentsSummary {
  total: number;
  totalInvoiced: number;
  students: { id: number; name: string; payed: number; assisted: number }[];
}

export default class PaymentRequest extends ApiModelRequest<
  Payment,
  SubmittablePayment
> {

  static mapModelFromApi: (model: any) => Payment = model => {
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
  }

  total = async (options?: {
    month?: Date;
    invoiced?: boolean;
    studentId?: number;
  }) => {
    const path = this.basePath + "/total";

    let whereBetween: WhereBetween | undefined;
    let whereEquals: Where | undefined;
    let whereRelation: WhereRelation | undefined;

    if (options) {
      // Filter by Month
      if (options.month) {
        const range = helpers.date.getFormatedMonthRange(options.month);
        whereBetween = {
          payed_at: { min: range.start, max: range.end }
        };
      }
      // Filter by invoiced
      if (options.invoiced !== undefined) {
        whereEquals = { invoiced: options.invoiced ? "1" : "0" };
      }
      // Filter by student
      if (options.studentId !== undefined) {
        whereRelation = {
          id: { relation: "student", value: options.studentId }
        };
      }
    }

    const pathWithQueryParams = this.queryStringBuilder(path)
      .withWhereBetween(whereBetween)
      .withWhereEquals(whereEquals)
      .withWhereRelation(whereRelation)
      .build();

    const res = await this.httpClient.fetch(pathWithQueryParams, Method.GET, {
      withCredentials: true
    });

    return res.total;
  };

  summary: (month: Date) => Promise<PaymentsSummary> = async month => {
    const path =
      this.basePath + "/summary/" + helpers.date.format(month, "YYYY-MM-DD");

    const res = await this.httpClient.fetch(path, Method.GET, {
      withCredentials: true
    });

    return {
      total: res.total,
      totalInvoiced: res.total_invoiced,
      students: res.students
    };
  };

  protected mapModelFromApi = PaymentRequest.mapModelFromApi;

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
