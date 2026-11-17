import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const { search, category } = req.query;

  try {
    const filter = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { marathiName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch products", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch product", error: err.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, marathiName, category, description, benefits, sizes, price, emoji, available } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: "Product name and category are required." });
  }

  try {
    const newProduct = new Product({
      name,
      marathiName,
      category,
      description,
      benefits: benefits || [],
      sizes: sizes || [],
      price,
      emoji,
      available: available !== undefined ? available : true,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Could not create product", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, marathiName, category, description, benefits, sizes, price, emoji, available } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        marathiName,
        category,
        description,
        benefits,
        sizes,
        price,
        emoji,
        available,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Could not update product", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Could not delete product", error: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const total = await Product.countDocuments();
    const available = await Product.countDocuments({ available: { $ne: false } });
    const unavailable = total - available;

    res.json({
      totalProducts: total,
      availableProducts: available,
      unavailableProducts: unavailable,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch stats", error: err.message });
  }
};
