import Http from "./Http";

export default {

  show: (id) =>
    Http.fetch(`/students/${id}`, 'get')
      .then(student => ({ ...student, phoneNumber: student.phone_number })),

  list: (options = {}) => {

    let path = '/students'

    path = Http.helpers.appendWhereQueryString(path, options)

    return Http.fetch(path, 'get')
      .then(students => students.map(student => ({ ...student, phoneNumber: student.phone_number })))
  },

  create: (data) => {

    data = Http.helpers.removeEmptyProperties(data)

    if (data.phoneNumber) {

      data.phone_number = data.phoneNumber

      delete data.phoneNumber
    }

    return Http.fetch('/students', 'post', { body: JSON.stringify(data) })
  },

  update: (id, data) => {

    data = Http.helpers.removeEmptyProperties(data)

    if (data.phoneNumber) {

      data.phone_number = data.phoneNumber

      delete data.phoneNumber
    }

    return Http.fetch(`/students/${id}`, 'put', { body: JSON.stringify(data) })
  },

  delete: (id) => Http.fetch(`/students/${id}`, 'delete')
}