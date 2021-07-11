const dotenv = require("dotenv");

if (process.env.NODE_ENV === "dev") {
  const envFound = dotenv.config();
  if (envFound.error)
    throw new Error("Development mode: Could not find .env file");
}

module.exports = {
  /**
   * API Port
   */
  port: process.env.PORT || 5000,
  /**
   * API configs
   */
  api: {
    prefix: "/inventory",
  },
  /**
   * Database configs
   */
  db: {
    uri: process.env.DATABASE_URL || null,
    config: {
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.DB_PORT,
      idleTimeoutMillis: 30000,
    },
  },
  /**
   * JWT secret
   */
   jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    maxAccessTokenAge: "1h",
    maxRefreshTokenAge: "24h",
  },
};
