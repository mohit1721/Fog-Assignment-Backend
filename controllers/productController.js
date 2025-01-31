const Product = require("../modals/productModel");

// @desc Get all products with filters, sorting & pagination
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    let { brand, category, minPrice, maxPrice, sortBy, order, page, limit } =
      req.query;

    let query = {};
    if (brand) query.brand = new RegExp(brand, "i");
    if (category) query.category = new RegExp(category, "i");
    if (minPrice || maxPrice)
      query.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };

    const total = await Product.countDocuments(query);
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 6;
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort({ [sortBy || "price"]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    res.json({ products, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new product
// @route POST /api/products
const addProduct = async (req, res) => {
  try {
    const { name, brand, category, price } = req.body;
    const product = await Product.create({ name, brand, category, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update an existing product
// @route PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, brand, category, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, brand, category, price },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete a product
// @route DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
