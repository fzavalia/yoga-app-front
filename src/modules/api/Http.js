class Http {

  constructor(host) {
    this.host = host
  }

  /**
   * @param {string} path
   * @param {string} method
   * @param {object} options
   * @param {any} options.body
   * @param {object} options.headers
   */
  fetch = (path, method, options = {}) => {

    if (['post', 'put'].includes(method)) {
      options.headers = Object.assign(options.headers || {}, { 'Content-Type': 'application/json' })
    }

    return fetch(`${this.host}${path}`, { method: this.mapMethod(method), headers: options.headers, body: options.body })
      .then(res => res.json())
  }

  mapMethod = (method) => {

    if (!['get', 'post', 'put', 'delete'].includes(method)) {
      throw new Error(`${method} is not a correct http method`)
    }

    return method
  }

}

export default new Http('http://localhost:8000')