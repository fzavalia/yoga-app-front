import HttpClient, { Method } from "../core/HttpClient";
import QueryStringBuilder from "../core/QueryStringBuilder";
import { ListOptions, ShowOptions } from "../core/ModelRequest";

export default class ModelRequestHelpers {

  constructor(
    private basePath: string,
    private httpClient: HttpClient,
    private queryStringBuilder: (path: string) => QueryStringBuilder) { }

  list = (options: ListOptions) => {

    const path = this.queryStringBuilder(this.basePath)
      .withInclude(options.include)
      .withOrder(options.order)
      .withPagination(options.pagination)
      .withWhere(options.where)
      .build()

    return this.httpClient.fetch(path, Method.GET)
  }

  show = (id: number, options: ShowOptions) => {

    const path = this.basePath + '/' + id

    const pathWithQueryString = this.queryStringBuilder(path)
      .withInclude(options.include)
      .build()

    return this.httpClient.fetch(pathWithQueryString, Method.GET)
  }
}