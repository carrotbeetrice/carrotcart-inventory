const pool = require("../pool").getPool();
const sql = require("sql-bricks-postgres");

module.exports = {
  getByCategory: (categoryId) => {
    const getByCategoryQuery = sql
      .select("ProductId", "Title", "Price", "Image")
      .from("Products")
      .where({ CategoryId: categoryId })
      .toParams();

    return new Promise((resolve, reject) => {
      pool.query(
        getByCategoryQuery.text,
        getByCategoryQuery.values,
        (err, result) => {
          if (err) return reject(err);
          else return resolve(result.rows);
        }
      );
    });
  },
  getById: (customerId, productId) => {
    const text = "SELECT * FROM getProduct($1, $2)";
    const values = [productId, customerId];
    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) => {
        if (err) return reject(err);
        else return resolve(result.rows[0]);
      });
    });
  },
};
