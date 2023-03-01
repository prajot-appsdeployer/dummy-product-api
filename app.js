// import express from "express";
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require("./routes/productRoutes");

const connectDB = require("./database/dbConnect");

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api/products", productRoutes);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("Node API is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
