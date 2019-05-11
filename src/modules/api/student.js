import Http from "./Http";

export default {

  show: (id) =>
    Http.fetch(`/students/${id}`, 'get')
      .then(student => ({ ...student, phoneNumber: student.phone_number })),

  list: (options = {}) => {

    let path = '/students'

    if (options.where) {

      const filters = Object.keys(options.where).filter(key => options.where[key])

      if (filters.length > 0) {
        path += '?where=' + filters.map(key => `${key}:${options.where[key]}`).join(',')
      }
    }

    return Http.fetch(path, 'get')
      .then(students => students.map(student => ({ ...student, phoneNumber: student.phone_number })))
  },

  delete: (id) => Http.fetch(`/students/${id}`, 'delete')
}