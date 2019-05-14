import HttpClient, { Method } from "./HttpClient";
import QueryStringBuilder, { Where, Order, Pagination } from "./QueryStringBuilder";

export interface ListOptions {
  where?: Where
  include?: string[],
  order?: Order
  pagination?: Pagination
}

export default abstract class ModelRequest {

  abstract basePath: string

  constructor(protected httpClient: HttpClient, protected queryStringBuilder: (path: string) => QueryStringBuilder) { }

  list = (options: ListOptions) => {
    
    const path = this.queryStringBuilder(this.basePath)
      .withInclude(options.include)
      .withOrder(options.order)
      .withPagination(options.pagination)
      .withWhere(options.where)
      .build()

    return this.httpClient.fetch(path, Method.GET)
  }
}