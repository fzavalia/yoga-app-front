export default class HttpHelpers {

  appendWhereQueryString = (path, options) => {
    if (options.where) {
      const filters = Object.keys(options.where).filter(key => options.where[key]);
      path += this.makeQueryStringPrefix(path) + 'where=' + filters.map(key => `${key}:${options.where[key]}`).join(',');
    }
    return path;
  };

  appendCoverQueryString = (path, options) => {
    if (options.cover) {
      path += this.makeQueryStringPrefix(path) + 'cover=' + options.cover.join(',');
    }
    return path;
  }

  removeEmptyProperties = (data) => Object.keys(data).reduce((acc, next) => {
    if (data[next]) {
      acc[next] = data[next];
    }
    return acc;
  }, {});

  makeQueryStringPrefix = (path) => path.includes('?') ? '&' : '?';
}
