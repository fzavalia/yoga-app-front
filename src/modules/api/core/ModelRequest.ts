import HttpClient, { Method } from "./HttpClient";
import QueryStringBuilder, { Where, Order, Pagination } from "./QueryStringBuilder";

export interface ListOptions {
  where?: Where
  include?: string[],
  order?: Order
  pagination?: Pagination
}

export interface ShowOptions {
  include?: string[]
}

export default class ModelRequest {

  constructor(
    protected basePath: string,
    protected httpClient: HttpClient,
    protected queryStringBuilder: (path: string) => QueryStringBuilder
  ) { }

  list = (options: ListOptions = {}) => {

    const path = this.queryStringBuilder(this.basePath)
      .withInclude(options.include)
      .withOrder(options.order)
      .withPagination(options.pagination)
      .withWhere(options.where)
      .build()

    return this.httpClient.fetch(path, Method.GET)
  }

  show = (id: number, options: ShowOptions = {}) => {

    const path = this.basePath + '/' + id

    const pathWithQueryString = this.queryStringBuilder(path)
      .withInclude(options.include)
      .build()

    return this.httpClient.fetch(pathWithQueryString, Method.GET)
  }
}