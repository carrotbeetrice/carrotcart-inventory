const pool = require("../pool").getPool();

module.exports = {
  getCart: (customerId) => {
    const text = "SELECT * FROM getCart($1)";

    return new Promise((resolve, reject) => {
      pool.query(text, [customerId], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          const cartItems = result.rows;

          cartItems.forEach((item) => {
            item.price = parseFloat(item.price).toFixed(2);
            item.subtotal = parseFloat(item.subtotal).toFixed(2);
          });

          return resolve(cartItems);
        }
      });
    });
  },
  addToCart: (customerId, productId, quantity) => {
    const text = "SELECT * FROM addToCart($1, $2, $3)";
    const values = [customerId, productId, quantity];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(result.rows[0].productcount)
      );
    });
  },
  updateCartItem: (customerId, productId, quantityChange) => {
    const text = "SELECT * FROM updateCartItem($1, $2, $3) AS newCount";
    const values = [customerId, productId, quantityChange];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(result.rows[0].newcount)
      );
    });
  },
  deleteFromCart: (customerId, productId) => {
    const text = "SELECT * FROM removeFromCart($1, $2)";
    const values = [customerId, productId];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(null)
      );
    });
  },
};
