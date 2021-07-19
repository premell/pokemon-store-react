const flattenObject = (obj, prefix = [], current = {}) => {
  if (typeof obj === "object" && obj !== null) {
    for (const key of Object.keys(obj)) {
      flattenObject(obj[key], prefix.concat(key), current);
    }
  } else {
    current[prefix.join(".")] = obj;
  }
  return current;
};

export default flattenObject;
