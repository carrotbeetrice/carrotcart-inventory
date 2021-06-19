const pool = require("../pool").getPool();
const sql = require("sql-bricks-postgres");

module.exports = {
  getProfile: (id) => {
    const getProfileQuery = sql
      .select()
      .from("Customer")
      .where({ id: id })
      .toParams();

    return new Promise((resolve, reject) => {
      pool.query(
        getProfileQuery.text,
        getProfileQuery.values,
        (err, result) => {
          if (err) reject(err);
          else return resolve(result.rows[0]);
        }
      );
    });
  },
  createProfile: (userData) => {
    const createProfileQuery = sql
      .insert("Customer", userData)
      .onConflict("id")
      .doNothing()
      .returning("COUNT(*)")
      .toParams();

    return new Promise((resolve, reject) => {
      pool.query(
        createProfileQuery.text,
        createProfileQuery.values,
        (err, result) => {
          if (err) reject(err);
          else return resolve(result.rows[0]);
        }
      );
    });
  },
};
