const express = require("express");
const cors = require("cors");
const config = require("./config");
const authJWT = require("./utils/jwtUtils");

const startServer = () => {
  const app = express();

  /**
   * Middlewares
   */
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(authJWT); // JWT authentication middleware

  // Use API routes
  require('./routes')(app);

  app.listen(config.port, () => {
    console.log(`Running CarrotCart inventory on port ${config.port}`);
  });
};

startServer();
