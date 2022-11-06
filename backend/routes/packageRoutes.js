const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createPackage,
  getPackages,
  getPackageByNumber,
} = require("../controllers/packageController");

router.post("/", protect, createPackage).get("/", protect, getPackages);
router.get("/:id", getPackageByNumber);

module.exports = router;
