import Banner from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";

// CREATE BANNER
export const createBanner = async (req, res) => {
  try {
    const { title, slug, description, status } = req.body;

    let photoUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "banners",
      });
      photoUrl = result.secure_url;
    }

    const banner = await Banner.create({
      title,
      slug,
      description,
      status,
      photo: photoUrl,
    });

    res.status(201).json({ success: true, banner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET ALL BANNERS
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json({ success: true, banners });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET SINGLE BANNER
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json({ success: true, banner });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE BANNER
export const updateBanner = async (req, res) => {
  try {
    const { title, slug, description, status } = req.body;

    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "banners",
      });
      banner.photo = result.secure_url;
    }

    banner.title = title || banner.title;
    banner.slug = slug || banner.slug;
    banner.description = description || banner.description;
    banner.status = status || banner.status;

    await banner.save();
    res.json({ success: true, banner });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE BANNER
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
