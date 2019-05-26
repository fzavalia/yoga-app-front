import QueryStringBuilder, {
  Pagination,
  Order,
  Where
} from "../core/QueryStringBuilder";

export default class ApiQueryStringBuilder implements QueryStringBuilder {
  private path: string;

  constructor(basePath: string) {
    this.path = basePath;
  }

  withInclude = (include?: string[]) => {
    if (include && include.length > 0) {
      this.path += this.getPathPrefix() + "include=" + include.join(",");
    }
    return this;
  };

  withPagination = (pagination?: Pagination) => {
    if (pagination) {
      this.path += this.getPathPrefix() + "page=" + pagination.page;
      if (pagination.limit) {
        this.path += "&per_page=" + pagination.limit;
      }
    }
    return this;
  };

  withOrder = (order?: Order) => {
    if (order) {
      this.path += this.getPathPrefix() + "order_by=" + order.by;
      if (order.type) {
        this.path += "&order_type=" + order.type;
      }
    }
    return this;
  };

  withWhere = (where?: Where) => {
    if (where && Object.keys(where).length > 0) {
      this.path +=
        this.getPathPrefix() +
        "where=" +
        Object.keys(where)
          .map(x => `${x}:${where[x]}`)
          .join(",");
    }
    return this;
  };

  build = () => this.path;

  private getPathPrefix = () => (this.path.includes("?") ? "&" : "?");
}
