import ModelRequest, { ListOptions, ShowOptions } from "../core/ModelRequest";
import HttpClient from "../core/HttpClient";
import QueryStringBuilder from "../core/QueryStringBuilder";
import Student from "../../../models/Student";

export default class StudentModelRequest extends ModelRequest<Student> {

  constructor(httpClient: HttpClient, queryStringBuilder: (path: string) => QueryStringBuilder) {
    super('/students', httpClient, queryStringBuilder)
  }

  list = (options: ListOptions = {}) =>
    this.helpers.list(options)
      .then((apiStudents: any[]) => apiStudents.map(this.mapApiModel))

  show = (id: number, options: ShowOptions = {}) =>
    this.helpers.show(id, options)
      .then(this.mapApiModel) 

  protected mapApiModel: (model: any) => Student = model => ({
    phoneNumber: model.phone_number,
    email: model.email,
    name: model.name,
    dni: model.dni,
    id: model.id as number,
  })
}