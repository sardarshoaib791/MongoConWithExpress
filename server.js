const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define a schema and model for products
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const ProductModel = mongoose.model("Product", ProductSchema);

// Define routes
app.get("/", (req, res) => {
  ProductModel.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
