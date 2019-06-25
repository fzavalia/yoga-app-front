import { Method, BodyType } from "../core/HttpClient";
import QueryStringBuilder, {
  Where,
  Order,
  WhereBetween,
  WhereRelation,
  WhereRelationBetween
} from "../core/QueryStringBuilder";
import Request from "../core/Request";

export interface ListOptions {
  where?: Where;
  whereEquals?: Where;
  whereRelation?: WhereRelation;
  whereRelationEquals?: WhereRelation;
  whereBetween?: WhereBetween;
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
  total: number;
  currentPage: number;
  lastPage: number;
  hasMore: boolean;
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
      .fetch(pathWithQueryParameters, Method.GET, { withCredentials: true })
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
      .fetch(pathWithQueryParameters, Method.GET, { withCredentials: true })
      .then(res => {
        const paginatedResult: PaginatedResult<Model> = {
          data: res.data.map(this.mapModelFromApi),
          total: res.total,
          currentPage: res.current_page,
          lastPage: res.last_page,
          hasMore: res.current_page < res.last_page
        };
        return paginatedResult;
      });
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
      .fetch(pathWithQueryString, Method.GET, { withCredentials: true })
      .then(this.mapModelFromApi);
  };

  create = (student: Submittable) =>
    this.httpClient.fetch(this.basePath, Method.POST, {
      body: { type: BodyType.JSON, args: this.mapSubmittableForApi(student) },
      withCredentials: true
    });

  update = (id: number, student: Submittable) =>
    this.httpClient.fetch(`${this.basePath}/${id}`, Method.PUT, {
      body: { type: BodyType.JSON, args: this.mapSubmittableForApi(student) },
      withCredentials: true
    });

  delete = (id: number) =>
    this.httpClient.fetch(`${this.basePath}/${id}`, Method.DELETE, {
      withCredentials: true
    });

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
      .withWhereEquals(options.whereEquals)
      .withWhereRelation(options.whereRelation)
      .withWhereRelationEquals(options.whereRelationEquals)
      .withWhereBetween(options.whereBetween)
      .withWhereRelationBetween(options.whereRelationBetween);
  };
}
