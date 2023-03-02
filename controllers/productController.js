const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  const { name, sort, select } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  const Products = await apiData;
  res.status(200).json({ Products, nbHits: Products.length });
};

module.exports = { getAllProducts };
