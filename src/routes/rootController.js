let router = require('express').Router();

router.get("/", (req, res) => {
    console.log("Current user:", req.user);
    return res.json("Hello there");
});

module.exports = router;