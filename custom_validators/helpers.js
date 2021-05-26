const isEmpty = (value) => {
  return (
    !value ||
    (typeof value === "object" && !Boolean(Object.keys(value).length)) ||
    (typeof value === "string" && !Boolean(value.trim().length))
  );
};

//const test = { email: "Please enter a valid email" };
//console.log(typeof { email: "Please enter a valid email" });
//console.log(typeof test === "object" && !Boolean(Object.keys(test).length));

module.exports = { isEmpty };
