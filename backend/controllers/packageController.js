const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Package = require("../models/packageModel");
const axios = require("axios");

// Creating a package by user
const createPackage = asyncHandler(async (req, res) => {
  const { name, trackingNumber } = req.body;
  if (!name || !trackingNumber) {
    res.status(400);
    throw new Error("Please add a pruduct and description");
  }

  const packageExists = await Package.findOne({ trackingNumber });

  if (packageExists) {
    res.status(400);
    throw new Error("Package Already Exists");
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const package = await Package.create({
    user: req.user.id,
    name,
    trackingNumber,
  });

  res.status(201).json(package);
});

// Get Package by Tracking Number
const getPackageByNumber = asyncHandler(async (req, res) => {
  const response = await axios.get(
    `https://www.posta.com.mk/api/api.php/shipment?code=${req.params.id}`
  );
  console.log(response.data);

  res
    .status(200)
    .json({ currentPackage: req.params.id, details: response.data });
});

// Get user using the id in the JWT
const getPackages = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const packages = await Package.find({ user: req.user.id });

  res.status(200).json(packages);
});

const deletePackage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const package = await Package.findById(req.params.id);

  if (!package) {
    res.status(404);
    throw new Error("Package not found");
  }

  if (package.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  await package.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  createPackage,
  getPackages,
  getPackageByNumber,
  deletePackage,
};
