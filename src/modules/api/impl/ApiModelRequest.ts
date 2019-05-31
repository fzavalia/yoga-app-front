import { Method, BodyType } from "../core/HttpClient";
import QueryStringBuilder, {
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
}

export interface PaginatedListOptions extends ListOptions {
  limit?: number;
}

export interface ShowOptions {
  include?: string[];
}

export interface PaginatedResult<Model> {
  data: Model[];
}

export default abstract class ApiModelRequest<
  Model,
  Submittable
> extends Request {
  list: (options?: ListOptions) => Promise<Model[]> = (options = {}) => {
    const pathWithQueryParameters = this.prepareQueryStringBuilderWithListOptions(
      this.queryStringBuilder(this.basePath),
      options
    ).build();

    return this.httpClient
      .fetch(pathWithQueryParameters, Method.GET)
      .then(models => models.map(this.mapModelFromApi));
  };

  paginatedList: (
    page: number,
    options?: PaginatedListOptions
  ) => Promise<PaginatedResult<Model>> = (page, options = {}) => {
    const pathWithQueryParameters = this.prepareQueryStringBuilderWithListOptions(
      this.queryStringBuilder(this.basePath),
      options
    )
      .withPagination({ page, limit: options.limit })
      .build();

    return this.httpClient
      .fetch(pathWithQueryParameters, Method.GET)
      .then(paginatedResult => ({
        data: paginatedResult.data.map(this.mapModelFromApi)
      }));
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

  private prepareQueryStringBuilderWithListOptions = (
    qsb: QueryStringBuilder,
    options: ListOptions
  ) => {
    return qsb
      .withInclude(options.include)
      .withOrder(options.order)
      .withWhere(options.where)
      .withWhereRelation(options.whereRelation)
      .withWhereBetween(options.whereBetween)
      .withWhereRelationBetween(options.whereRelationBetween)
      .withWhere(options.where);
  };
}
