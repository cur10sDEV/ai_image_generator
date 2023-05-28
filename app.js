const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
// routes
const imageRouter = require("./routes/imgGenRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
//routes
app.use("/v1/openai", imageRouter);

app.listen(PORT, () =>
  console.log(`Server started successfully on port ${PORT}`)
);
