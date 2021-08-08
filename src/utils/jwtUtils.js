const jwt = require("jsonwebtoken");
const jwtConfig = require("../config").jwt;

const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwtConfig.accessTokenSecret, (err, decoded) => {
      if (err) return res.status(403).send(err);
      else {
        // console.log("JWT payload:", decoded);
        req.user = decoded.id;
        req.email = decoded.email;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authJWT;
