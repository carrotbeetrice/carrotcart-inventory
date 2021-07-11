module.exports = (app) => {
  app.use("/", require("./rootController"));
  app.use("/customer", require("./customerController"));
  app.use("/category", require("./categoryController"));
  app.use("/products", require("./productsController"));
  app.use("/wishlist", require("./wishlistController"));
};
