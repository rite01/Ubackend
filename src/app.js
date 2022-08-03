require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");

const { restRouter } = require("./routes");

//database........
connection();

//middleware--------------
app.use(express.json());
app.use(express({ extends: false }));
app.use(cors());

//routes
app.use("/api/v1", restRouter);

module.exports = { app };
