import FetchHttpClient from "./impl/FetchHttpClient";
import ApiQueryStringBuilder from "./impl/ApiQueryStringBuilder";
import HttpClient from "./core/HttpClient";
import QueryStringBuilder from "./core/QueryStringBuilder";
import StudentRequest from "./requests/StudentRequest";
import PaymentRequest from "./requests/PaymentRequest";
import YogaClassApiModelRequest from "./requests/YogaClassRequest";
import AssistanceTableRequest from "./requests/AssistanceTableRequest";
import AuthRequest from "./requests/AuthRequest";

const apiHost = process.env.REACT_APP_API_HOST || "";

const httpClient: HttpClient = new FetchHttpClient(apiHost);

const queryStringBuilder: (path: string) => QueryStringBuilder = path =>
  new ApiQueryStringBuilder(path);

export default {
  errorStream: httpClient.errorStream,

  setAccessTokenFactory: (func: () => string) =>
    httpClient.setAccessTokenFactory(func),

  auth: new AuthRequest("/auth", httpClient, queryStringBuilder),

  student: new StudentRequest("/students", httpClient, queryStringBuilder),

  payment: new PaymentRequest("/payments", httpClient, queryStringBuilder),

  yogaClass: new YogaClassApiModelRequest(
    "/yoga_classes",
    httpClient,
    queryStringBuilder
  ),

  assistanceTable: new AssistanceTableRequest(
    "/assistance_tables",
    httpClient,
    queryStringBuilder
  )
};
