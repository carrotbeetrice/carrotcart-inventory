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
  getAddresses: (id) => {
    const text = "SELECT * FROM getAddresses($1)";
    const values = [id];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(result.rows)
      );
    });
  },
  addAddress: (id, addressDetails) => {
    const text = "SELECT * FROM addAddress($1, $2)";
    const values = [id, addressDetails];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, result) =>
        err ? reject(err) : resolve(null)
      );
    });
  },
  updateAddress: (id, postalCode, newAddressDetails) => {
    const text = "SELECT * FROM updateAddress($1, $2, $3)";
    const values = [id, postalCode, newAddressDetails];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, res) =>
        err ? reject(err) : resolve(null)
      );
    });
  },
  deleteAddress: (id, postalCode) => {
    const text = "SELECT * FROM deleteAddress($1, $2)";
    const values = [id, postalCode];

    return new Promise((resolve, reject) => {
      pool.query(text, values, (err, res) =>
        err ? reject(err) : resolve(null)
      );
    });
  },
};
