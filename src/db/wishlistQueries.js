const pool = require("../pool").getPool();

module.exports = {
  addItem: (customerId, productId) => {
    const productDetails = JSON.stringify({
      productId: productId,
      dateAdded: new Date().toISOString().slice(0, 10),
    });

    const text = "SELECT * FROM addToWishlist($1, $2::jsonb)";
    const values = [customerId, productDetails];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(result.rows[0].productcount)
      );
    });
  },
  getWishlist: (customerId) => {
    const text = "SELECT * FROM getWishlist($1)";
    return new Promise((resolve, reject) => {
      pool.query(text, [customerId], (err, result) =>
        err ? reject(err) : resolve(result.rows)
      );
    });
  },
  removeItem: (customerId, productId) => {
    const text = "SELECT * FROM removeFromWishlist($1, $2)";
    const values = [customerId, productId];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(result.rows[0].productcount)
      );
    });
  },
};
