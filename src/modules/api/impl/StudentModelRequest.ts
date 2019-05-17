import ModelRequest, { ListOptions, ShowOptions } from "../core/ModelRequest";
import HttpClient from "../core/HttpClient";
import QueryStringBuilder from "../core/QueryStringBuilder";

export interface Student {
  id: number;
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
      .then((apiStudents: any[]) => apiStudents.map(this.mapApiStudent));

  show = (id: number, options: ShowOptions = {}) =>
    this.helpers.show(id, options).then(this.mapApiStudent);

  private mapApiStudent: (student: any) => Student = student => ({
    ...student,
    phoneNumber: student.phone_number
  });
}
