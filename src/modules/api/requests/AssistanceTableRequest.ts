import Request from "../core/Request";
import helpers from "../../../helpers";
import { Method, BodyType } from "../core/HttpClient";
import { YogaClass } from "./YogaClassRequest";

export interface AssistanceTableData {
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

class AssistanceTableRequest extends Request {
  getDataForMonth: (
    dateInMonth: Date
  ) => Promise<AssistanceTableData> = dateInMonth =>
    this.httpClient
      .fetch(
        this.basePath + "/" + helpers.date.format(dateInMonth, "YYYY-MM-DD"),
        Method.GET,
        { withCredentials: true }
      )
      .then(this.mapApiResponse);

  updateAssistance: (studentIds: number[], date: Date) => Promise<YogaClass> = (
    studentIds,
    date
  ) =>
    this.httpClient.fetch(
      `${this.basePath}/yoga_classes/${this.mapDateForApi(date)}`,
      Method.PUT,
      {
        body: { type: BodyType.JSON, args: { student_ids: studentIds } },
        withCredentials: true
      }
    );

  updateStudentAssistance: (
    studentId: number,
    date: Date,
    assisted: boolean
  ) => Promise<YogaClass> = (studentId, date, assisted) =>
    this.httpClient.fetch(
      `${this.basePath}/yoga_classes/${this.mapDateForApi(
        date
      )}/students/${studentId}`,
      Method.PUT,
      {
        body: { type: BodyType.JSON, args: { assisted: assisted } },
        withCredentials: true
      }
    );

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

  private mapDateForApi = (date: Date) =>
    helpers.date.format(date, "YYYY-MM-DD");
}

export default AssistanceTableRequest;
