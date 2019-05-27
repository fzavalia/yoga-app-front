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

export interface WhereRelation {
  [props: string]: { relation: string; value: any };
}

export interface WhereBetween {
  [props: string]: { min: any; max: any };
}

export interface WhereRelationBetween {
  [props: string]: { relation: string; min: any; max: any };
}

export default interface QueryStringBuilder {
  withPagination: (pagination?: Pagination) => QueryStringBuilder;
  withOrder: (order?: Order) => QueryStringBuilder;
  withWhere: (where?: Where) => QueryStringBuilder;
  withWhereBetween: (where?: WhereBetween) => QueryStringBuilder;
  withWhereRelation: (where?: WhereRelation) => QueryStringBuilder;
  withWhereRelationBetween: (
    where?: WhereRelationBetween
  ) => QueryStringBuilder;
  withInclude: (include?: string[]) => QueryStringBuilder;
  build: () => string;
}
