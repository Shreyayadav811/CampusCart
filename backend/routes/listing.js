const express = require('express');
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Get all listings with search + filter
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = { isAvailable: true };

    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const listings = await Listing.find(query)
      .populate('seller', 'name hostel')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('seller', 'name hostel phone');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create listing
router.post('/', auth, upload.array('images', 4), async (req, res) => {
  try {
    const { title, description, price, category, condition, phone } = req.body;
    const images = req.files ? req.files.map(f => f.path) : [];

    const listing = await Listing.create({
      title, description, price, category, condition, phone,
      images, seller: req.user.id
    });

    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.seller.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await listing.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;