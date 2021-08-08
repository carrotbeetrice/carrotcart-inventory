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
      pool.query(getProfileQuery.text, getProfileQuery.values, (err, result) =>
        err ? reject(err) : resolve(result.rows[0])
      );
    });
  },
  createProfile: (userData) => {
    const createProfileQuery = sql
      .insert("Customer", userData)
      .onConflict("id")
      .doNothing()
      .returning("id")
      .toParams();

    return new Promise((resolve, reject) => {
      pool.query(
        createProfileQuery.text,
        createProfileQuery.values,
        (err, result) => (err ? reject(err) : resolve(result.rows[0].id))
      );
    });
  },
  addOrUpdateProfilePhoto: (id, uri) => {
    const addUpdatePhotoQuery = sql
      .update("Customer")
      .set("profilephotouri", uri)
      .where("id", id)
      .returning("id")
      .toParams();

    return new Promise((resolve, reject) => {
      pool.query(
        addUpdatePhotoQuery.text,
        addUpdatePhotoQuery.values,
        (err, result) => (err ? reject(err) : resolve(result.rows[0].id))
      );
    });
  },
};
