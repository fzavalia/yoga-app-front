import ModelRequest from "./ModelRequest";
import { Method } from "./HttpClient";

export default class StudentRequest extends ModelRequest {

  list = (options: any) => {
    return this.httpClient.fetch('/students', Method.GET)
  }
}