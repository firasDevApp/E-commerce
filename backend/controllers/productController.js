import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import slugify from "slugify";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "title slug")
      .populate("sub_category", "title slug")
      .populate("brand", "title slug")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "title slug")
      .populate("sub_category", "title slug")
      .populate("brand", "title slug");

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, summary, price, discount, stock, category, sub_category, brand, status } = req.body;

    let photoUrls = [];

    // upload plusieurs images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      );
      const results = await Promise.all(uploadPromises);
      photoUrls = results.map(r => r.secure_url);
    }

    const slug = slugify(title, { lower: true, strict: true });

    const product = await Product.create({
      title,
      slug,
      summary,
      photos: photoUrls,
      price,
      discount,
      stock,
      category: category ? new mongoose.Types.ObjectId(category) : null,
      sub_category: sub_category ? new mongoose.Types.ObjectId(sub_category) : null,
      brand: brand ? new mongoose.Types.ObjectId(brand) : null,
      status,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { title, summary, price, discount, stock, category, sub_category, brand, status } = req.body;

    let updateData = { title, summary, price, discount, stock, status };

    if (title) updateData.slug = slugify(title, { lower: true, strict: true });

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      );
      const results = await Promise.all(uploadPromises);
      updateData.photos = results.map(r => r.secure_url);
    }

    if (category) updateData.category = new mongoose.Types.ObjectId(category);
    if (sub_category) updateData.sub_category = new mongoose.Types.ObjectId(sub_category);
    if (brand) updateData.brand = new mongoose.Types.ObjectId(brand);

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
