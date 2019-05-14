import StudentRequest from "./StudentRequest";
import FetchHttpClient from "./FetchHttpClient";

const fetch = new FetchHttpClient('http://localhost:8000')

export default {
  student: new StudentRequest(fetch)
}