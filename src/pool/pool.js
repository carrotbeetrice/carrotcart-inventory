const Pool = require("pg").Pool;
const db = require("../config/config").db;

var pool;

module.exports = {
  getPool: () => {
    const conString = db.uri;
    pool = !conString
      ? new Pool(db.config)
      : new Pool({ connectionString: conString });
    return pool;
  },
};
