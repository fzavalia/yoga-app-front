import HttpClient from "./HttpClient";
import QueryStringBuilder, { Where, Order, Pagination } from "./QueryStringBuilder";
import ModelRequestHelpers from "../impl/ModelRequestHelpers";

export interface ListOptions {
  where?: Where
  include?: string[],
  order?: Order
  pagination?: Pagination
}

export interface ShowOptions {
  include?: string[]
}

export default abstract class ModelRequest<T> {

  protected helpers: ModelRequestHelpers

  constructor(
    protected basePath: string,
    protected httpClient: HttpClient,
    protected queryStringBuilder: (path: string) => QueryStringBuilder
  ) { 
    this.helpers = new ModelRequestHelpers(basePath, httpClient, queryStringBuilder)
  }

  abstract list: (options: ListOptions) => Promise<T[]>

  abstract show: (id: number, options: ShowOptions) => Promise<T>

  protected abstract mapApiModel: (apiModel: any) => T
}