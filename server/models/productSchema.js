const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
