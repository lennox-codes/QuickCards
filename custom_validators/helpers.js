const isEmpty = (value) => {
  return (
    !value ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

//const test = { email: "Please enter a valid email" };
//console.log(typeof { email: "Please enter a valid email" });
//console.log(typeof test === "object" && !Boolean(Object.keys(test).length));

module.exports = { isEmpty };
