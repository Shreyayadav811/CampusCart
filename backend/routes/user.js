const express = require('express');
const User = require('../models/User');
const Listing = require('../models/Listing');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const listings = await Listing.find({ seller: req.params.id, isAvailable: true })
      .sort({ createdAt: -1 });

    res.json({ user, listings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;