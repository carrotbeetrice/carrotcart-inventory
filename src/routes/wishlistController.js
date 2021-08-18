const router = require("express").Router();
const {
  getWishlist,
  addOrDeleteItem,
  deleteItem,
} = require("../db/wishlistQueries");

/**
 * Get wishlist
 */
router.get("/", async (req, res) => {
  try {
    const customerId = req.user;
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
  try {
    const customerId = req.user;
    const productId = parseInt(req.body.productId);
    const inWishlist = JSON.parse(String(req.body.inWishlist).toLowerCase());
    const productCount = await addOrDeleteItem(customerId, productId);
    if (inWishlist && productCount === 0) {
      // Item deleted successfully
      return res.sendStatus(200);
    } else if (!inWishlist && productCount === 1) {
      // Item added successfully
      return res.sendStatus(201);
    } else {
      throw new Error("Error adding/deleting item from wishlist");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Delete item from wishlist
 */
router.delete("/:productId", async (req, res) => {
  try {
    const customerId = req.user;
    const productId = parseInt(req.params.productId);
    const productCount = await deleteItem(customerId, productId);
    if (productCount === 0) return res.sendStatus(200);
    else return res.status(500).send("Error deleting item from wishlist");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
