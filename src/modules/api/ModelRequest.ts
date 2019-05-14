import HttpClient from "./HttpClient";

export default abstract class ModelRequest {
  constructor(protected httpClient: HttpClient) { }
}