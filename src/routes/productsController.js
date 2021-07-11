const router = require("express").Router();
const { getByCategory, getById } = require("../db/productsQueries");

router.get("/category/:categoryId", (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  getByCategory(categoryId)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

router.get("/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const customerId = parseInt(req.user);
  getById(productId, customerId)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
