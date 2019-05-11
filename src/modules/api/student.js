import Http from "./Http";

export default {

  list: (options = {}) => {

    let path = '/students'

    if (options.where) {

      const filters = Object.keys(options.where).filter(key => options.where[key])

      if (filters.length > 0) {
        path += '?where=' + filters.map(key => `${key}:${options.where[key]}`).join(',')
      }
    }

    return Http.fetch(path, 'get')
  }
}