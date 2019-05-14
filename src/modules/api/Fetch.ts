export enum FetchMethod {
  GET,
  POST,
  PUT,
  DELETE
}

export enum FetchOptionsBodyType {
  JSON,
  FORM
}

export interface FetchOptionsBodyArgs {
  [props: string]: any
}

export type FetchOptionsHeaders = FetchOptionsBodyArgs

export interface FetchOptionsBody {
  type: FetchOptionsBodyType,
  args: { [props: string]: any }
}

export interface FetchOptions {
  body?: FetchOptionsBody,
  headers?: Map<string, string>
}

export class FetchError {
  constructor(private status: number, private message: string) {}
}

export default interface Fetch {
  fetch: (path: string, method: FetchMethod, options?: FetchOptions) => Promise<{}>
}