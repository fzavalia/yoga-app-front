import HttpClient, {
  Method,
  Options,
  BodyType,
  BodyArgs,
  Headers
} from "../core/HttpClient";
import { Observable, Subject } from "rxjs";

export default class FetchHttpClient implements HttpClient {
  errorStream: Observable<number>;
  requestStarted: Observable<void>;
  requestEnded: Observable<void>;

  private getAccessToken = () => "";

  private errorEmitter = new Subject<number>();
  private requestStartedEmitter = new Subject<void>();
  private requestEndedEmitter = new Subject<void>();

  constructor(private host: string) {
    this.errorStream = this.errorEmitter;
    this.requestStarted = this.requestStartedEmitter;
    this.requestEnded = this.requestEndedEmitter;
  }

  setAccessTokenFactory = (func: () => string) => {
    this.getAccessToken = func;
  };

  fetch = async (path: string, method: Method, options: Options = {}) => {
    const body = this.getBodyFromOptions(options);
    const headers = this.getHeadersFromOptions(options);

    this.requestStartedEmitter.next();

    const res = await fetch(`${this.host}${path}`, {
      method: this.mapMethod(method),
      body,
      headers
    });

    if (res.status >= 300) {
      const error = await res.text();
      this.errorEmitter.next(res.status);
      throw new Error(JSON.stringify(error));
    }

    this.requestEndedEmitter.next();

    // Return the response as a JSON or an empty response if it is not parsable

    try {
      return await res.json();
    } catch (e) {
      return {};
    }
  };

  private mapMethod = (method: Method) => {
    switch (method) {
      case Method.DELETE:
        return "delete";
      case Method.GET:
        return "get";
      case Method.POST:
        return "post";
      case Method.PUT:
        return "put";
    }
  };

  private getHeadersFromOptions = (options: Options) => {
    let headers: Headers = {
      Accept: "application/json"
    };

    if (options.headers) {
      headers = Object.assign(headers, options.headers);
    }

    if (options.body && options.body.type === BodyType.JSON) {
      headers["Content-Type"] = "application/json";
    }

    if (options.withCredentials) {
      headers["Authorization"] = "Bearer " + this.getAccessToken();
    }

    return headers;
  };

  private getBodyFromOptions = (options: Options) => {
    if (!options.body) {
      return undefined;
    }

    const body = options.body;

    switch (body.type) {
      case BodyType.FORM:
        return this.mapBodyArgsToForm(body.args);
      default:
        return this.mapBodyArgsToJSON(body.args);
    }
  };

  private mapBodyArgsToJSON = (args: BodyArgs) =>
    JSON.stringify(
      Object.entries(args).reduce(
        (acc, arg) => ({ ...acc, [arg[0]]: arg[1] }),
        {}
      )
    );

  private mapBodyArgsToForm = (args: BodyArgs) =>
    Object.entries(args).reduce((form, arg) => {
      form.append(arg[0], arg[1]);
      return form;
    }, new FormData());
}
