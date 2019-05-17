import ModelRequest, { ListOptions, ShowOptions } from "../core/ModelRequest";
import HttpClient, { Method, BodyType } from "../core/HttpClient";
import QueryStringBuilder from "../core/QueryStringBuilder";

export interface Student {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  dni: string;
}

export interface SubmitableStudent {
  name: string;
  phoneNumber: string;
  email: string;
  dni: string;
}

export default class StudentModelRequest extends ModelRequest<Student> {
  constructor(
    httpClient: HttpClient,
    queryStringBuilder: (path: string) => QueryStringBuilder
  ) {
    super("/students", httpClient, queryStringBuilder);
  }

  list = (options: ListOptions = {}) =>
    this.helpers
      .list(options)
      .then((apiStudents: any[]) => apiStudents.map(this.mapStudentFromApi));

  show = (id: number, options: ShowOptions = {}) =>
    this.helpers.show(id, options).then(this.mapStudentFromApi);

  update = (id: number, student: any) =>
    this.httpClient.fetch("/students/" + id, Method.PUT, {
      body: { type: BodyType.JSON, args: this.mapStudentForApi(student) }
    });

  private mapStudentFromApi: (student: any) => Student = student => ({
    ...student,
    phoneNumber: student.phone_number
  });

  private mapStudentForApi = (student: SubmitableStudent) => ({
    ...student,
    phone_number: student.phoneNumber
  })
}
