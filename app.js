// import express from "express";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

const Product = require("./models/productModel");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get all the products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(JSON.stringify(products));
  } catch (error) {
    res.send({ message: error.message });
  }
});

// ge product by id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.send(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
});

// to add product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

// to update the product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.send({ message: `Can not find any product with ID ${id}` });
    }

    const updatedProduct = await Product.findById(id);
    res.send(updatedProduct);

    res.send(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
});

// to delete the product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.send({ message: `Can not find any product with ID ${id}` });
    }

    const updatedProductList = await Product.find({});
    res.send(updatedProductList);

    res.send(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
});

console.log();
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to the mongodb database");
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Node API is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
