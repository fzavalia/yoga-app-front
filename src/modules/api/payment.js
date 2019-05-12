import Http from "./Http";

export default {

  show: (id) => Http.fetch(`/payments/${id}`, 'get'),

  list: (options = {}) => {

    let path = '/payments'

    path = Http.helpers.appendWhereQueryString(path, options)

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

    data = Http.helpers.removeEmptyProperties(data)

    return Http.fetch(`/payments/${id}`, 'put', { body: JSON.stringify(data) })
  },

  delete: (id) => Http.fetch(`/payments/${id}`, 'delete')
}