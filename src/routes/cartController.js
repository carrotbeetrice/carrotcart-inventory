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
 * Add to cart
 */
router.post("/:productId/:quantity", async (req, res) => {
  try {
    const { productId, quantity } = req.params;

    if (productId == null) {
      return res.status(400).send("Missing product id");
    }

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
router.put("/:productId/:change", async (req, res) => {
  try {
    const { productId, change } = req.params;

    if (productId == null) {
      return res.status(400).send("Missing product id");
    }

    const updateResult = await updateCartItem(req.user, productId, change);

    if (updateResult > 0) {
      return res.sendStatus(200);
    } else {
      return res.status(500).send("Error updating cart");
    }
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

    if (productId == null) {
      return res.status(400).send("Missing product id");
    }

    await deleteFromCart(req.user, productId);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
