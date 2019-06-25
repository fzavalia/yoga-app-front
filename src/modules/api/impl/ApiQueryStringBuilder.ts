import QueryStringBuilder, {
  Pagination,
  Order,
  Where,
  WhereRelation,
  WhereBetween,
  WhereRelationBetween
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

  withWhere = (where?: Where) =>
    this.whereBase<Where>(
      (where, filter) => where[filter].length > 0,
      "where",
      (where, filter) => `${filter}:${where[filter]}`,
      where
    );

  withWhereEquals = (where?: Where) =>
    this.whereBase<Where>(
      (where, filter) => where[filter].length > 0,
      "where_equals",
      (where, filter) => `${filter}:${where[filter]}`,
      where
    );

  withWhereRelation = (where?: WhereRelation) =>
    this.whereBase<WhereRelation>(
      (where, filter) => where[filter].value.length > 0,
      "where_relation",
      (where, filter) =>
        `${where[filter].relation}.${filter}:${where[filter].value}`,
      where
    );

  withWhereBetween = (where?: WhereBetween) =>
    this.whereBase<WhereBetween>(
      (_, __) => true,
      "where_between",
      (where, filter) => `${filter}:${where[filter].min}:${where[filter].max}`,
      where
    );

  withWhereRelationBetween = (where?: WhereRelationBetween) =>
    this.whereBase<WhereRelationBetween>(
      (_, __) => true,
      "where_relation_between",
      (where, filter) =>
        `${where[filter].relation}.${filter}:${where[filter].min}:${
          where[filter].max
        }`,
      where
    );

  build = () => this.path;

  private getPathPrefix = () => (this.path.includes("?") ? "&" : "?");

  private whereBase = <T>(
    filterNotEmpty: (where: T, filter: any) => boolean,
    whereQueryName: string,
    mapFilterToQueryParam: (where: T, filter: any) => string,
    where?: T
  ) => {
    if (where) {
      const filters = Object.keys(where).filter(x => filterNotEmpty(where, x));
      if (filters.length > 0) {
        this.path +=
          this.getPathPrefix() +
          `${whereQueryName}=` +
          Object.keys(where)
            .map(x => mapFilterToQueryParam(where, x))
            .join(",");
      }
    }
    return this;
  };
}
