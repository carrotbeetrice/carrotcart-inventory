const pool = require("../pool").getPool();
const sql = require("sql-bricks-postgres");

module.exports = {
  getAllCategories: () => {
    const getCategoriesQuery = sql.select().from("Category").toParams();

    return new Promise((resolve, reject) => {
      pool.query(
        getCategoriesQuery.text,
        getCategoriesQuery.values,
        (err, result) => {
          if (err) reject(err);
          else return resolve(result.rows);
        }
      );
    });
  },
};
