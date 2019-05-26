export enum OrderType {
  ASC = "asc",
  DESC = "desc"
}

export interface Pagination {
  page: number;
  limit?: number;
}

export interface Order {
  by: string;
  type?: OrderType;
}

export interface Where {
  [props: string]: any;
}

export default interface QueryStringBuilder {
  withPagination: (pagination?: Pagination) => QueryStringBuilder;
  withOrder: (order?: Order) => QueryStringBuilder;
  withWhere: (where?: Where) => QueryStringBuilder;
  withInclude: (include?: string[]) => QueryStringBuilder;
  build: () => string;
}
