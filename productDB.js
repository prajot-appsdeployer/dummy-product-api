const connectDB = require("./database/dbConnect");
const Product = require("./models/productModel");

const ProductJson = require("./products.json");

const start = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();
