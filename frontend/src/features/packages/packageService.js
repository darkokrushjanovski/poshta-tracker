import axios from "axios";

const API_URL = "http://localhost:5000/api/packages/";

const createPackage = async (packageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, packageData, config);

  return response.data;
};

const getPackages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const getPackageByNumber = async (trackingNumber) => {
  const response = await axios.get(`${API_URL}${trackingNumber}`, {
    timeout: 5000,
  });
  return response.data;
};

const packageService = { createPackage, getPackages, getPackageByNumber };

export default packageService;
