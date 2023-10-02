const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const Image = require("../models/Images");
const Page = require("../models/Pages");

// Create a new image
router.post('/images', upload.single("image"), async (req, res) => {
  const { filename, description } = req.body;
    try {
    const newImage = new Image({ filename, description, filenameData: req.file.filename });
    await newImage.save();
    res.status(201).send({ msg: "Image added with success", newImage })
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Create a new image and add it to the content of a page
router.post('/images-withpage', upload.single("image"), async (req, res) => {
  const { filename, description, pageId } = req.body;
    try {
    const newImage = new Image({ filename, description, filenameData: req.file.filename });
    const page = await Page.findById(pageId);
    page.images = page.images.push(newImage._id)
    await newImage.save();
    await page.save();
    res.status(201).send({ msg: "Image added to the content of a page with success", newImage })
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get Images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).send({ msg: "list of images", images });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get a specific image by ID
router.get('/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send({ error: 'Image not found' });
    }
    res.status(200).send({ msg: "Requested image!", image });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all the images that are used by more than one page
router.get('/images-used-by-multiple-pages', async (req, res) => {
  try {
    const imagesUsedByMultiplePages = await Page.aggregate([
      {
        $group: {
          _id: '$images',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    const imageIds = imagesUsedByMultiplePages.map((result) => result._id);

    const images = await Image.find({ _id: { $in: imageIds } });

    res.status(200).send({ msg: "Images used by more than one page!", images });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching images used by multiple pages' });
  }
});

// Update the content of an existing image or it's description by ID
router.put('/images/:id', upload.single("image"), async (req, res) => {
  try {
    const { filename, description } = req.body;
    const existingImage = await Image.findById(req.params.id);
    if (!existingImage) {
      return res.status(404).send({ error: 'Image not found' });
    }
    if (req.file) {
      existingImage.filenameData = req.file.filename;
    }
    existingImage.filename = filename; 
    existingImage.description = description; 
    await existingImage.save();
    res.status(200).send({ msg: "Image updated!", image });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete an image by ID
router.delete('/images/:id', async (req, res) => {
  let isImageUsed = async (imageId) => {
    const count = await Page.countDocuments({ images: imageId });
    return count > 0;
  }
  try {
    const usedOnPages = await isImageUsed(req.params.id);
    if (usedOnPages) {
      return res.status(400).send({ error: 'Image is being used on one or more pages. Cannot delete.' });
    }
    await Image.findByIdAndRemove(req.params.id);
    res.status(200).send({ msg: 'Image deleted' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;