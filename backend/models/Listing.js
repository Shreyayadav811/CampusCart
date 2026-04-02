const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Books', 'Electronics', 'Notes', 'Hostel Stuff', 'Cycles & Bikes', 'Clothes', 'Other']
  },
  condition: {
    type: String,
    enum: ['Like New', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  images: [{ type: String }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);