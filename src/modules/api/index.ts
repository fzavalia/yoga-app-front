import FetchHttpClient from "./impl/FetchHttpClient";
import ApiQueryStringBuilder from "./impl/ApiQueryStringBuilder";
import ModelRequest from "./core/ModelRequest";
import HttpClient from "./core/HttpClient";
import QueryStringBuilder from "./core/QueryStringBuilder";

const fetch: HttpClient = new FetchHttpClient('http://localhost:8000')
const queryStringBuilder: (path: string) => QueryStringBuilder = path => new ApiQueryStringBuilder(path)

export default {
  student: new ModelRequest('/students', fetch, queryStringBuilder),
  payments: new ModelRequest('/payments', fetch, queryStringBuilder),
  classes: new ModelRequest('/yoga_classes', fetch, queryStringBuilder),
}