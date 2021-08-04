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
  port: process.env.PORT,
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
  /**
   * AWS S3 configs
   */
  s3: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    REGION: process.env.REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
    SIGNATURE_VERSION: process.env.SIGNATURE_VERSION,
  },
};
