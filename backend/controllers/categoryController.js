import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import slugify from "slugify";
import mongoose from "mongoose";


export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("parent", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate("parent", "title");

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const createCategory = async (req, res) => {
  try {
    const { title, summary, is_parent, parent, status } = req.body;

    let photoUrl = "";
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
      });
      photoUrl = upload.secure_url;
    }

    const slug = slugify(title, { lower: true, strict: true });
    const isParentBoolean = is_parent === 'true'; 

    const category = await Category.create({
      title,
      slug,
      summary,
      photo: photoUrl,
      is_parent: isParentBoolean,
      parent: !isParentBoolean && parent ? new mongoose.Types.ObjectId(parent) : null,
      status,
    });

    res.status(201).json({ success: true, category });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const { title, summary, is_parent, parent, status } = req.body;

    // Convert string to boolean
    const isParentBoolean = is_parent === 'true';

    let updateData = { title, summary, status };
    if (title) updateData.slug = slugify(title, { lower: true, strict: true });

    // Upload photo si présent
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
      });
      updateData.photo = upload.secure_url;
    }

    updateData.is_parent = isParentBoolean;
    updateData.parent = !isParentBoolean && parent ? new mongoose.Types.ObjectId(parent) : null;

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getChildByParent = async (req, res) => {
  try {
    const parentId = req.params.id; 

    const children = await Category.find({ parent: parentId })
      .populate("parent", "title");

    if (!children || children.length === 0) {
      return res.status(404).json({ success: false, message: "No child categories found" });
    }

    res.status(200).json({ success: true, children });
  } catch (err) {
    console.error("Error fetching child categories:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

