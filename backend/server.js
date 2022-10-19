const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log(`Server is running on port ${port}`);
});
