const router = require("express").Router();
const customerQueries = require("../db/customerQueries");
const _ = require("underscore");

/**
 * Create new profile
 */
router.get("/new", (req, res) => {
  const userData = {
    ...req.body,
    id: req.user,
  };
  customerQueries
    .createProfile(userData)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

/**
 * View profile
 */
router.get("/", (req, res) => {
  const customerId = req.user;

  customerQueries
    .getProfile(customerId)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

/**
 * Edit profile
 */

module.exports = router;
