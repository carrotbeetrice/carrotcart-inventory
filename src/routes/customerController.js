const router = require("express").Router();
const { getProfile, createProfile } = require("../db/customerQueries");

/**
 * Create new profile
 */
router.get("/new", (req, res) => {
  const userData = {
    ...req.body,
    id: req.user,
  };
  createProfile(userData)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

/**
 * View profile
 */
router.get("/", (req, res) => {
  const customerId = req.user;

  getProfile(customerId)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

/**
 * Edit profile
 */

module.exports = router;
