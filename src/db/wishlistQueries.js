const pool = require("../pool").getPool();

module.exports = {
  getWishlist: (customerId) => {
    const text = "SELECT * FROM getWishlist($1)";
    return new Promise((resolve, reject) => {
      pool.query(text, [customerId], (err, result) =>
        err ? reject(err) : resolve(result.rows)
      );
    });
  },
  addOrDeleteItem: (customerId, productId) => {
    const text = "SELECT * FROM addOrDeleteFromWishlist($1, $2)";
    const values = [customerId, productId];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(result.rows[0].productcount)
      );
    });
  },
  deleteItem: (customerId, productId) => {
    const text = "SELECT * FROM removeFromWishlist($1, $2)";
    const values = [customerId, productId];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(result.rows[0].productcount)
      );
    });
  },
};
