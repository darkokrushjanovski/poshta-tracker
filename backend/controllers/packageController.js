const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Package = require("../models/packageModel");
const axios = require("axios");
const parseString = require("xml2js").parseString;

// Creating a package by user
const createPackage = asyncHandler(async (req, res) => {
  const { name, trackingNumber } = req.body;
  if (!name || !trackingNumber) {
    res.status(400);
    throw new Error("Please add a pruduct and description");
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
    `https://posta.com.mk/tnt/api/query?id=${req.params.id}`
  );
  parseString(response.data, function (err, result) {
    res.status(200).send(result);
  });
});

const getPackages = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const packages = await Package.find({ user: req.user.id });

  res.status(200).json(packages);
});

module.exports = { createPackage, getPackages, getPackageByNumber };
