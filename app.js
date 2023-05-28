const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () =>
  console.log(`Server started successfully on port ${PORT}`)
);
