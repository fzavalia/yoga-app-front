import HttpClient, { Method, BodyType } from "../core/HttpClient";
import QueryStringBuilder, {
  Where,
  Order,
  Pagination
} from "../core/QueryStringBuilder";

export interface ListOptions {
  where?: Where;
  include?: string[];
  order?: Order;
  pagination?: Pagination;
}

export interface ShowOptions {
  include?: string[];
}

export default abstract class ApiModelRequest<Model, Submittable> {
  constructor(
    protected basePath: string,
    protected httpClient: HttpClient,
    protected queryStringBuilder: (path: string) => QueryStringBuilder
  ) {}

  list = (options: ListOptions = {}) => {
    const path = this.queryStringBuilder(this.basePath)
      .withInclude(options.include)
      .withOrder(options.order)
      .withPagination(options.pagination)
      .withWhere(options.where)
      .build();

    return this.httpClient
      .fetch(path, Method.GET)
      .then(models => models.map(this.mapModelFromApi));
  };

  show = (id: number, options: ShowOptions = {}) => {
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
      body: { type: BodyType.JSON, args: this.mapModelForApi(student) }
    });

  update = (id: number, student: Submittable) =>
    this.httpClient.fetch(`${this.basePath}/${id}`, Method.PUT, {
      body: { type: BodyType.JSON, args: this.mapModelForApi(student) }
    });

  delete = (id: number) =>
    this.httpClient.fetch(`${this.basePath}/${id}`, Method.DELETE);

  protected abstract mapModelFromApi: (model: any) => Model;

  protected abstract mapModelForApi: (model: Submittable) => any;
}
