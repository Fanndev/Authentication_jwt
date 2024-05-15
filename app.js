require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

// port
const port = process.env._PORT;

// express setup
app.use(methodOverride("_"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env._SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Database
const sequelize = require("./src/config/database/db");
sequelize
  .authenticate()
  .then(() => {
    console.log("Koneksi database berhasil");
  })
  .catch((err) => {
    console.log("Koneksi database gagal: " + err);
  });

// routes
require("./src/routes")(express, app);

// server
app.listen(port, () => {
  console.log(`API_NEXTAUTH running on port || ${port}`);
});
