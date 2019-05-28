import Request from "../core/Request";
import helpers from "../../../helpers";
import { Method } from "../core/HttpClient";

export interface AssistanceGraphData {
  yogaClasses: {
    id: number;
    date: Date;
    studentIds: number[];
  }[];
  payments: {
    id: number;
    studentId: number;
    amount: number;
  }[];
  students: {
    id: number;
    name: string;
  }[];
}

class AssistanceGraphRequest extends Request {
  getDataForMonth: (
    dateInMonth: Date
  ) => Promise<AssistanceGraphData> = dateInMonth =>
    this.httpClient
      .fetch(
        this.basePath + "/" + helpers.date.format(dateInMonth, "YYYY-MM-DD"),
        Method.GET
      )
      .then(this.mapApiResponse);

  private mapApiResponse = (res: any) => ({
    payments: this.mapPaymentsFromApi(res.payments),
    students: this.mapStudentsFromApi(res.students),
    yogaClasses: this.mapYogaClassesFromApi(res.yoga_classes)
  });

  private mapPaymentsFromApi = (payments: any[]) =>
    payments.map(p => ({
      id: p.id,
      studentId: p.student_id,
      amount: p.amount
    }));

  private mapStudentsFromApi = (students: any[]) =>
    students.map(s => ({
      id: s.id,
      name: s.name
    }));

  private mapYogaClassesFromApi = (yogaClasses: any[]) =>
    yogaClasses.map(yc => ({
      date: helpers.date.normalize(new Date(yc.date)),
      id: yc.id,
      studentIds: yc.students.map((s: any) => s.id)
    }));
}

export default AssistanceGraphRequest;
