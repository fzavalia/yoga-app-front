import FetchHttpClient from "./impl/FetchHttpClient";
import ApiQueryStringBuilder from "./impl/ApiQueryStringBuilder";
import HttpClient from "./core/HttpClient";
import QueryStringBuilder from "./core/QueryStringBuilder";
import StudentApiModelRequest from "./apiModelRequests/StudentApiModelRequest";
import PaymentApiModelRequest from "./apiModelRequests/PaymentApiModelRequest";
import YogaClassApiModelRequest from "./apiModelRequests/YogaClassApiModelRequest";

const httpClient: HttpClient = new FetchHttpClient("http://localhost:8000");
const queryStringBuilder: (path: string) => QueryStringBuilder = path =>
  new ApiQueryStringBuilder(path);

export default {
  student: new StudentApiModelRequest(
    "/students",
    httpClient,
    queryStringBuilder
  ),
  payment: new PaymentApiModelRequest(
    "/payments",
    httpClient,
    queryStringBuilder
  ),
  yogaClass: new YogaClassApiModelRequest(
    "/yoga_classes",
    httpClient,
    queryStringBuilder
  )
};
