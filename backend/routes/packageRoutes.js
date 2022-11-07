const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createPackage,
  getPackages,
  getPackageByNumber,
  deletePackage,
} = require("../controllers/packageController");

router.post("/", protect, createPackage).get("/", protect, getPackages);
router.get("/:id", getPackageByNumber).delete("/:id", protect, deletePackage);

module.exports = router;
