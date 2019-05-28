import FetchHttpClient from "./impl/FetchHttpClient";
import ApiQueryStringBuilder from "./impl/ApiQueryStringBuilder";
import HttpClient from "./core/HttpClient";
import QueryStringBuilder from "./core/QueryStringBuilder";
import StudentRequest from "./requests/StudentRequest";
import PaymentRequest from "./requests/PaymentRequest";
import YogaClassApiModelRequest from "./requests/YogaClassRequest";
import AssistanceGraphRequest from "./requests/AssistanceGraphRequest";

const httpClient: HttpClient = new FetchHttpClient("http://localhost:8000");
const queryStringBuilder: (path: string) => QueryStringBuilder = path =>
  new ApiQueryStringBuilder(path);

export default {
  student: new StudentRequest("/students", httpClient, queryStringBuilder),
  payment: new PaymentRequest("/payments", httpClient, queryStringBuilder),
  yogaClass: new YogaClassApiModelRequest(
    "/yoga_classes",
    httpClient,
    queryStringBuilder
  ),
  assistanceGraph: new AssistanceGraphRequest(
    "/assistance_graphs",
    httpClient,
    queryStringBuilder
  )
};
