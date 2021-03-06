import { Observable } from "rxjs";

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
  withCredentials?: boolean;
}

export default interface HttpClient {
  fetch: (path: string, method: Method, options?: Options) => Promise<any>;
  setAccessTokenFactory: (func: () => string) => void;
  errorStream: Observable<number>;
  requestStarted: Observable<void>;
  requestEnded: Observable<void>;
}
