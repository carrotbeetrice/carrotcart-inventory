const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const authJWT = require("./utils/jwtUtils");

const startServer = () => {
  const app = express();

  /**
   * Middlewares
   */
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(authJWT);

  // Use API routes
  app.use(config.api.prefix, (req, res) => {
    console.log("Current user:", req.user);
    res.json("Hello there");
  });

  app.listen(config.port, () => {
    console.log(`Running CarrotCart inventory on port ${config.port}`);
  });
};

startServer();
