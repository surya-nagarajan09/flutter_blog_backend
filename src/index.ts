import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// routes

import userRoute from "./routes/index.router";

app.use(userRoute);

app.get("/", (req, res) => {
  res.send("progress");
});

app.listen(4000, () => {
  console.log("listening on port");
});
