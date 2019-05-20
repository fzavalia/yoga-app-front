import HttpClient from "./HttpClient";
import QueryStringBuilder, {
  Where,
  Order,
  Pagination
} from "./QueryStringBuilder";



export default abstract class ModelRequest {
  constructor(
    protected basePath: string,
    protected httpClient: HttpClient,
    protected queryStringBuilder: (path: string) => QueryStringBuilder
  ) {}
}
