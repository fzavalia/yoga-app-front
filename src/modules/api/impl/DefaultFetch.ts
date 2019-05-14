import Fetch, { FetchMethod, FetchOptions, FetchOptionsBody, FetchOptionsBodyType, FetchOptionsBodyArgs, FetchOptionsHeaders, FetchError } from "../core/Fetch";

export default class DefaultFetch implements Fetch {

  constructor(private host: string) { }

  fetch = async (path: string, method: FetchMethod, options: FetchOptions) => {

    const body = options.body ? this.mapBody(options.body) : undefined
    const headers = this.mapHeaders(options)
    const res = await fetch(`${this.host}${path}`, { method: this.mapMethod(method), body, headers })

    if (res.status >= 300) {
      const error = await res.text()
      throw new FetchError(res.status, error)
    }
    
    return await res.json()
  }

  private mapMethod = (method: FetchMethod) => {
    switch (method) {
      case FetchMethod.DELETE:
        return 'delete'
      case FetchMethod.GET:
        return 'get'
      case FetchMethod.POST:
        return 'post'
      case FetchMethod.PUT:
        return 'put'
    }
  }

  private mapHeaders = (options: FetchOptions) => {
    const headers: FetchOptionsHeaders = options.headers ? { ...options.headers } : {}
    if (options.body && options.body.type === FetchOptionsBodyType.JSON) {
      headers['Content-Type'] = 'application/json';
    }
    return headers
  }

  private mapBody = (body: FetchOptionsBody) => {
    switch (body.type) {
      case FetchOptionsBodyType.JSON:
        return this.mapBodyArgsToJSON(body.args)
      case FetchOptionsBodyType.FORM:
        return this.mapBodyArgsToForm(body.args)
    }
  }

  private mapBodyArgsToJSON = (args: FetchOptionsBodyArgs) =>
    JSON.stringify(Object.entries(args).reduce((acc, arg) => ({ ...acc, [arg[0]]: arg[1] }), {}))

  private mapBodyArgsToForm = (args: FetchOptionsBodyArgs) =>
    Object.entries(args).reduce((form, arg) => {
      form.append(arg[0], arg[1])
      return form
    }, new FormData())
}