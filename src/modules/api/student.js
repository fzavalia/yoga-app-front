import Http from "./Http";

export default {
  list: (options = {}) => {
    return Http.fetch('/students', 'get')
  }
}