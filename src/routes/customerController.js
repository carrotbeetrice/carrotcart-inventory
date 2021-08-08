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
router.post("/", (req, res) => {
  const userData = {
    ...req.body,
    id: req.user,
    email: req.email,
    joinedon: new Date(),
  };

  createProfile(userData)
    .then((data) => {
      if (data === req.user) {
        return res.sendStatus(201);
      } else {
        throw new Error("Error creating new user profile");
      }
    })
    .catch((err) => {
      console.debug(err);
      return res.status(500).send(err);
    });
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
router.put("/", (req, res) => {
  return res.sendStatus(501);
});

/**
 * Add/update profile photo
 */
router.post("/avatar", upload.single("avatar"), async (req, res) => {
  if (req.file == null) return res.status(500).send("File not found.");

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
