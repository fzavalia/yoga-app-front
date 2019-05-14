import FetchHttpClient from "./FetchHttpClient";
import ApiQueryStringBuilder from "./ApiQueryStringBuilder";
import ModelRequest from "./ModelRequest";

const fetch = new FetchHttpClient('http://localhost:8000')
const queryStringBuilder = (path: string) => new ApiQueryStringBuilder(path)

export default {
  student: new ModelRequest('/students', fetch, queryStringBuilder),
  payments: new ModelRequest('/payments', fetch, queryStringBuilder),
  classes: new ModelRequest('/yoga_classes', fetch, queryStringBuilder),
}