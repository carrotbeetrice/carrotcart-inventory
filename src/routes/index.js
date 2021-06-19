module.exports = (app) => {
  app.use("/", require("./rootController"));
  app.use("/customer", require("./customerController"));
};
