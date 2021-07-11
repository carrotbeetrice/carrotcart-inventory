const router = require("express").Router();
const { getWishlist, addItem, removeItem } = require("../db/wishlistQueries");

/**
 * Get wishlist
 */
router.get("/", async (req, res) => {
  const customerId = parseInt(req.user);

  try {
    const wishlist = await getWishlist(customerId);
    wishlist.forEach((item) => {
      item.price = parseFloat(item.price);
      item.dateadded = new Date(item.dateadded);
    });
    return res.send(wishlist);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Add/delete item from wishlist
 */
router.post("/", async (req, res) => {
  const customerId = parseInt(req.user);
  const productId = parseInt(req.body.productId);
  const inWishlist = JSON.parse(String(req.body.inWishlist).toLowerCase());
  try {
    if (inWishlist) {
      // Delete item
      const productCount = await removeItem(customerId, productId);
      if (productCount === 0) {
        return res.sendStatus(200);
      } else {
        throw new Error("Error removing item from wishlist");
      }
    } else {
      // Add item
      const productCount = await addItem(customerId, productId);
      if (productCount === 1) {
        return res.sendStatus(201);
      } else {
        throw new Error("Error adding item to wishlist");
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
