import ModelRequest from "../core/ModelRequest";
import HttpClient, { Method, BodyType } from "../core/HttpClient";
import QueryStringBuilder from "../core/QueryStringBuilder";
import ApiModelRequestHelpers, {
  ListOptions,
  ShowOptions
} from "./ApiModelRequestHelpers";

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

export default class StudentModelRequest extends ModelRequest {
  private helpers: ApiModelRequestHelpers;

  constructor(
    httpClient: HttpClient,
    queryStringBuilder: (path: string) => QueryStringBuilder
  ) {
    super("/students", httpClient, queryStringBuilder);
    this.helpers = new ApiModelRequestHelpers(
      this.basePath,
      this.httpClient,
      this.queryStringBuilder
    );
  }

  list = (options: ListOptions = {}) =>
    this.helpers
      .list(options)
      .then((apiStudents: any[]) => apiStudents.map(this.mapStudentFromApi));

  show = (id: number, options: ShowOptions = {}) =>
    this.helpers.show(id, options).then(this.mapStudentFromApi);

  create = (student: SubmitableStudent) =>
    this.httpClient.fetch("/students", Method.POST, {
      body: { type: BodyType.JSON, args: this.mapStudentForApi(student) }
    });

  update = (id: number, student: SubmitableStudent) =>
    this.httpClient.fetch("/students/" + id, Method.PUT, {
      body: { type: BodyType.JSON, args: this.mapStudentForApi(student) }
    });

  delete = (id: number) =>
    this.httpClient.fetch("/students/" + id, Method.DELETE);

  private mapStudentFromApi: (student: any) => Student = student => ({
    ...student,
    phoneNumber: student.phone_number
  });

  private mapStudentForApi = (student: SubmitableStudent) => ({
    ...student,
    phone_number: student.phoneNumber
  });
}
