import axios from "axios";

const API_URL = "http://localhost:5000/api/packages/";

// Create a new package
const createPackage = async (packageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, packageData, config);

  return response.data;
};

// Get all packages by user
const getPackages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get package status
const getPackageByNumber = async (trackingNumber) => {
  const response = await axios.get(`${API_URL}${trackingNumber}`, {
    timeout: 5000,
  });
  return response.data;
};

// Delete a package
const deletePackage = async (packageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${packageId}`, config);

  return response.data;
};

const packageService = {
  createPackage,
  getPackages,
  getPackageByNumber,
  deletePackage,
};

export default packageService;
