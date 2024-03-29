const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://jcjord:"+process.env.MONGO_ATLAS_PW+"@cluster0.1enob.mongodb.net/angular-app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("connection error");
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
