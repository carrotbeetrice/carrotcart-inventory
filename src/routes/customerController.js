const router = require("express").Router();
const {
  getProfile,
  createProfile,
  addOrUpdateProfilePhoto,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../db/customerQueries");
const { v4: uuidv4 } = require("uuid");
const { uploadImage, getPublicUri } = require("../utils/s3Utils");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const _ = require("underscore");

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

/**
 * Get customer addresses
 */
router.get("/addresses", async (req, res) => {
  try {
    const customerId = req.user;
    const addresses = await getAddresses(customerId);
    return res.send(addresses);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Add new customer address
 */
router.post("/addresses", async (req, res) => {
  try {
    const customerId = req.user;
    // Check if default field is provided
    if (req.body.default) {
      req.body.default = JSON.parse(String(req.body.default).toLowerCase());
    } else {
      req.body.default = false;
    }

    //TODO: Figure out how to add an address id to each address
    // const addressDetails = {
    //   ...req.body,
    //   addressId: uuidv4(),
    // };

    // console.log(addressDetails);

    await addAddress(customerId, req.body);

    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

/**
 * Update customer address
 */
router.put("/addresses", async (req, res) => {
  try {
    const details = _.pick(req.body, (value) => value !== null && value !== "");

    if (!details.postalCodeOld)
      return res.status(400).send("Postal code missing");

    await updateAddress(
      req.user,
      details.postalCodeOld,
      _.omit(details, "postalCodeOld")
    );

    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * Delete customer address
 */
router.delete("/addresses", async (req, res) => {
  try {
    if (!req.body.postalCode)
      return res.status(400).send("Postal code missing");

    await deleteAddress(req.user, req.body.postalCode);

    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
