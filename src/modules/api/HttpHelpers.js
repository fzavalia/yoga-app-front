export default class HttpHelpers {

  appendWhereQueryString = (path, listOptions) => {
    const prefix = path.includes('?') ? '&' : '?';
    if (listOptions.where) {
      const filters = Object.keys(listOptions.where).filter(key => listOptions.where[key]);
      path += prefix + 'where=' + filters.map(key => `${key}:${listOptions.where[key]}`).join(',');
    }
    return path;
  };

  removeEmptyProperties = (data) => Object.keys(data).reduce((acc, next) => {
    if (data[next]) {
      acc[next] = data[next];
    }
    return acc;
  }, {});
}
