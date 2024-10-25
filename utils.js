function flattenObject(obj) {
  let headers = [];
  let data = [];

  function getChildren(key, value) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.keys(value).forEach(subKey => {
        getChildren(key + '.' + subKey, value[subKey]);
      });
    } else {
      if (Array.isArray(value)) {
        value = value.join();
      }
      headers.push(key);
      data.push(value);
    }
  }

  Object.keys(obj).forEach(key => {
    getChildren(key, obj[key]);
  });

  return {headers,data};
}