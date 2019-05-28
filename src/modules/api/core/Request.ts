import HttpClient from "./HttpClient";
import QueryStringBuilder from "./QueryStringBuilder";

abstract class Request {
  constructor(
    protected basePath: string,
    protected httpClient: HttpClient,
    protected queryStringBuilder: (path: string) => QueryStringBuilder
  ) {}
}

export default Request;
