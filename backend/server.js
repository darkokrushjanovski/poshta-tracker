const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {});

//Routes
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
