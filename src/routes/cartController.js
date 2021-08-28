const router = require("express").Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  deleteFromCart,
} = require("../db/cartQueries");

/**
 * Get cart
 */
router.get("/", async (req, res) => {
  try {
    const shoppingCart = await getCart(req.user);
    return res.send(shoppingCart);
  } catch (err) {
    return res.sendStatus(500);
  }
});

/**
 * Delete from cart
 */
router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (isNaN(productId)) {
      return res.status(400).send("Invalid product id");
    }

    await deleteFromCart(req.user, productId);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

/**
 * Request parameter validation for /:productId/:quantity path
 */
router.use("/:productId/:quantity", (req, res, next) => {
  const { productId, quantity } = req.params;

  if (isNaN(productId)) {
    return res.status(400).send("Invalid product id");
  } else if (isNaN(quantity)) {
    return res.status(400).send("Invalid product quantity");
  } else {
    next();
  }
});

/**
 * Add to cart
 */
router.post("/:productId/:quantity", async (req, res) => {
  try {
    const { productId, quantity } = req.params;

    const addResult = await addToCart(req.user, productId, quantity);

    if (addResult > 0) {
      return res.sendStatus(200);
    } else {
      return res.status(500).send("Error adding item to cart");
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});

/**
 * Update cart
 */
router.put("/:productId/:quantity", async (req, res) => {
  try {
    const { productId, quantity } = req.params;

    await updateCartItem(req.user, productId, quantity);

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
