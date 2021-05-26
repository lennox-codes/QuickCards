const isEmpty = (value) => {
  !value ||
    (typeof value === "object" && Boolean(Object.keys(value).length)) ||
    (typeof value === "string" && Boolean(value.trim().length));
};

module.exports = isEmpty;
