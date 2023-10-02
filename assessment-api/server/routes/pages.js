const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const Page = require("../models/Pages");
const Image = require("../models/Images");

// Add page with slected images from the front
router.post("/add-page", async (req, res) => {
  const { title, content, imageObjectIds } = req.body;
  try {
    const newPage = new Page({
      title,
      content,
      images: imageObjectIds,
    });
    await newPage.save();
    res.status(201).send({ msg: "Page added with success", newPage });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error adding page" });
  }
});

// Add page and add it's images
router.post("/add-page-images", upload.array("images"), async (req, res) => {
  const { title, content } = req.body;
  const uploadedImages = req.files || [];
  try {
    const imageObjectIds = await Promise.all(
      uploadedImages.map(async (image) => {
        const newImage = new Image({
          filename: image.filename,
          description: "",
        });
        await newImage.save();
        return newImage._id;
      })
    );
    const newPage = new Page({
      title,
      content,
      images: imageObjectIds,
    });
    await newPage.save();
    res
      .status(201)
      .send({ msg: "Page with it's images added with success", newPage });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error adding page with images" });
  }
});

// Get all pages
router.get("/pages", async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).send({ msg: "list of pages", pages });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get one page with it's id
router.get("/pages/:id", async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).send({ error: "Page not found" });
    }
    res.status(200).send({ msg: "Requested page!", page });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update an existing page by ID
router.put("/pages/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const page = await Page.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!page) {
      return res.status(404).send({ error: "Page not found" });
    }
    res.status(200).send({ msg: "Page updated!", page });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete a page by ID
router.delete("/pages/:id", async (req, res) => {
  try {
    const page = await Page.findByIdAndRemove(req.params.id);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.status(200).send({ msg: "Page deleted" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
