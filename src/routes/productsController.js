const router = require("express").Router();
const { getById } = require("../db/productsQueries");

router.get("/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const customerId = parseInt(req.user);

    const data = await getById(customerId, productId);
    return res.send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
