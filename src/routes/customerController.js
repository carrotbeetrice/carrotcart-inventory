const router = require("express").Router();
const {
  getProfile,
  createProfile,
  addOrUpdateProfilePhoto,
} = require("../db/customerQueries");
const { uploadImage, getPublicUri } = require("../utils/s3Utils");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

/**
 * Add/update profile photo
 */
router.post("/avatar", upload.single("avatar"), async (req, res) => {
  // req.file contains the profile photo
  if (req.file == null) return res.status(500).send("File not uploaded.");

  try {
    const imageKey = await uploadImage(
      "profilephotos",
      req.file.buffer,
      req.file.mimetype
    );
    const publicUri = getPublicUri(imageKey);
    const result = await addOrUpdateProfilePhoto(req.user, publicUri);

    if (result === req.user) return res.sendStatus(200);
    else return res.status(500).send("Error updating profile photo.");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
