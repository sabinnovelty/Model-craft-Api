const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

require("dotenv").config();
const mongoose = require("./common/mongoose");
const appRoute = require("./route");

const app = express();
app.use(
  fileUpload({
    limits: { fileSize: 4 * 1024 * 1024 }
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", appRoute);

app.listen(process.env.PORT, () =>
  console.log(`server started at ${process.env.PORT}`)
);
