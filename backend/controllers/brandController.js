import Brand from "../models/Brand.js";
import slugify from "slugify";

//  CREATE BRAND
export const createBrand = async (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await Brand.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Brand already exists" });
    }

    const brand = await Brand.create({
      title,
      slug,
      status: status || "active",
    });

    res.status(201).json({ success: true, brand });
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  GET ALL BRANDS
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.json({ success: true, brands });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  GET SINGLE BRAND (with products)
export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate("products");
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }
    res.json({ success: true, brand });
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  UPDATE BRAND
export const updateBrand = async (req, res) => {
  try {
    const { title, status } = req.body;
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    if (title) {
      brand.title = title;
      brand.slug = slugify(title, { lower: true, strict: true });
    }
    if (status) brand.status = status;

    await brand.save();
    res.json({ success: true, brand });
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  DELETE BRAND
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    await brand.deleteOne();
    res.json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
