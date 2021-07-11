const router = require("express").Router();
const { getAllCategories } = require("../db/categoryQueries");
const { getByCategory } = require("../db/productsQueries");

/**
 * Get all categories
 */
router.get("/", (req, res) => {
  getAllCategories()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

/**
 * Get products by category
 */
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const products = await getByCategory(categoryId);
    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
