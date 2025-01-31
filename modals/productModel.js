const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "https://via.placeholder.com/150" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
