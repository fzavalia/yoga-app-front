import { Method, BodyType } from "../core/HttpClient";
import {
  Where,
  Order,
  Pagination,
  WhereBetween,
  WhereRelation,
  WhereRelationBetween
} from "../core/QueryStringBuilder";
import Request from "../core/Request";

export interface ListOptions {
  where?: Where;
  whereBetween?: WhereBetween;
  whereRelation?: WhereRelation;
  whereRelationBetween?: WhereRelationBetween;
  include?: string[];
  order?: Order;
  pagination?: Pagination;
}

export interface ShowOptions {
  include?: string[];
}

export default abstract class ApiModelRequest<
  Model,
  Submittable
> extends Request {
  list: (options?: ListOptions) => Promise<Model[]> = (options = {}) => {
    const path = this.queryStringBuilder(this.basePath)
      .withInclude(options.include)
      .withOrder(options.order)
      .withPagination(options.pagination)
      .withWhere(options.where)
      .withWhereRelation(options.whereRelation)
      .withWhereBetween(options.whereBetween)
      .withWhereRelationBetween(options.whereRelationBetween)
      .withWhere(options.where)
      .build();

    return this.httpClient
      .fetch(path, Method.GET)
      .then(models => models.map(this.mapModelFromApi));
  };

  show: (id: number, options?: ShowOptions) => Promise<Model> = (
    id,
    options = {}
  ) => {
    const path = this.basePath + "/" + id;

    const pathWithQueryString = this.queryStringBuilder(path)
      .withInclude(options.include)
      .build();

    return this.httpClient
      .fetch(pathWithQueryString, Method.GET)
      .then(this.mapModelFromApi);
  };

  create = (student: Submittable) =>
    this.httpClient.fetch(this.basePath, Method.POST, {
      body: { type: BodyType.JSON, args: this.mapSubmittableForApi(student) }
    });

  update = (id: number, student: Submittable) =>
    this.httpClient.fetch(`${this.basePath}/${id}`, Method.PUT, {
      body: { type: BodyType.JSON, args: this.mapSubmittableForApi(student) }
    });

  delete = (id: number) =>
    this.httpClient.fetch(`${this.basePath}/${id}`, Method.DELETE);

  protected abstract mapModelFromApi: (model: any) => Model;

  protected abstract mapSubmittableForApi: (model: Submittable) => any;
}
