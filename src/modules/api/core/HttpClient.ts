export enum Method {
  GET,
  POST,
  PUT,
  DELETE
}

export enum BodyType {
  JSON,
  FORM
}

export interface BodyArgs {
  [props: string]: any;
}

export type Headers = BodyArgs;

export interface Body {
  type: BodyType;
  args: { [props: string]: any };
}

export interface Options {
  body?: Body;
  headers?: Map<string, string>;
}

export class RequestError {
  constructor(private status: number, private message: string) {}
}

export default interface HttpClient {
  fetch: (path: string, method: Method, options?: Options) => Promise<any>;
}
