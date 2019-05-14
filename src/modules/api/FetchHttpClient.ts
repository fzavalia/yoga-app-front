import HttpClient, {
  Method,
  Options,
  Body,
  BodyType,
  BodyArgs,
  Headers,
  RequestError
} from "./HttpClient";

export default class FetchHttpClient implements HttpClient {

  constructor(private host: string) { }

  fetch = async (path: string, method: Method, options?: Options) => {

    const body = options && options.body ? this.mapBody(options.body) : undefined
    const headers = options ? this.mapHeaders(options) : {}
    const res = await fetch(`${this.host}${path}`, { method: this.mapMethod(method), body, headers })

    if (res.status >= 300) {
      const error = await res.text()
      throw new RequestError(res.status, error)
    }

    return await res.json()
  }

  private mapMethod = (method: Method) => {
    switch (method) {
      case Method.DELETE:
        return 'delete'
      case Method.GET:
        return 'get'
      case Method.POST:
        return 'post'
      case Method.PUT:
        return 'put'
    }
  }

  private mapHeaders = (options: Options) => {
    const headers: Headers = options.headers ? { ...options.headers } : {}
    if (options.body && options.body.type === BodyType.JSON) {
      headers['Content-Type'] = 'application/json';
    }
    return headers
  }

  private mapBody = (body: Body) => {
    switch (body.type) {
      case BodyType.JSON:
        return this.mapBodyArgsToJSON(body.args)
      case BodyType.FORM:
        return this.mapBodyArgsToForm(body.args)
    }
  }

  private mapBodyArgsToJSON = (args: BodyArgs) =>
    JSON.stringify(Object.entries(args).reduce((acc, arg) => ({ ...acc, [arg[0]]: arg[1] }), {}))

  private mapBodyArgsToForm = (args: BodyArgs) =>
    Object.entries(args).reduce((form, arg) => {
      form.append(arg[0], arg[1])
      return form
    }, new FormData())
}