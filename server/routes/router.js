const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const Product = require("../models/productSchema");

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, age, mobile, work, add, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !add || !desc) {
    return res.status(422).json("Please fill in all the required fields");
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      return res.status(422).json("This user is already present");
    }

    const adduser = new users({
      name,
      email,
      age,
      mobile,
      work,
      add,
      desc,
    });

    await adduser.save();
    return res.status(201).json(adduser);
  } catch (error) {
    return res.status(422).json(error);
  }
});

// Get all user data
router.get("/getdata", async (req, res) => {
  try {
    const userData = await users.find();
    res.status(201).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Get individual user by ID
router.get("/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(404).json(userindividual);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Update user data by ID
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Delete user by ID
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await users.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Add product details
router.post("/addProductDetails/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productName, quantity, date, stock } = req.body;

    const newProduct = new Product({
      userId,
      productName,
      quantity,
      date,
      stock,
    });

    const savedProduct = await newProduct.save();

    res.json(savedProduct);
  } catch (error) {
    console.error("Error adding product details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get product details by user ID
router.get("/getProductDetails/:userId", async (req, res) => {
    try {
      const products = await Product.find({ userId: req.params.userId });
      res.json(products);
    } catch (error) {
      console.error("Error fetching product details", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Delete product by ID
  router.delete("/deleteProduct/:productId", async (req, res) => {
    try {
      const { productId } = req.params;
      const deletedProduct = await Product.findByIdAndDelete({ _id: productId });
  
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(201).json(deletedProduct);
    } catch (error) {
      res.status(422).json(error);
    }
  });

module.exports = router;
