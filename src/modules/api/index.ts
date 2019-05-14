import StudentRequest from "./StudentRequest";
import FetchHttpClient from "./FetchHttpClient";
import ApiQueryStringBuilder from "./ApiQueryStringBuilder";

const fetch = new FetchHttpClient('http://localhost:8000')
const queryStringBuilder = (path: string) => new ApiQueryStringBuilder(path)

export default {
  student: new StudentRequest(fetch, queryStringBuilder)
}