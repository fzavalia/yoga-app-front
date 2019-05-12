import Http from "./Http";

export default {

  show: (id) => Http.fetch(`/payments/${id}`, 'get'),

  list: (options = {}) => {

    let path = '/payments'

    if (options.where) {

      const filters = Object.keys(options.where).filter(key => options.where[key])

      if (filters.length > 0) {
        path += '?where=' + filters.map(key => `${key}:${options.where[key]}`).join(',')
      }
    }

    return Http.fetch(path, 'get')
  },

  create: (data) => {

    data = Object.keys(data).reduce((acc, next) => {
      if (data[next]) {
        acc[next] = data[next]
      }
      return acc
    }, {})

    return Http.fetch('/payments', 'post', { body: JSON.stringify(data) })
  },

  update: (id, data) => {

    data = Object.keys(data).reduce((acc, next) => {
      if (data[next]) {
        acc[next] = data[next]
      }
      return acc
    }, {})

    return Http.fetch(`/payments/${id}`, 'put', { body: JSON.stringify(data) })
  },

  delete: (id) => Http.fetch(`/payments/${id}`, 'delete')
}