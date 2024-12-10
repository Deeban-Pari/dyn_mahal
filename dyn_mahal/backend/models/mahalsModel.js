const mongoose = require('mongoose');

const mahalsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
      unique: [true, 'Name already in use!'],
      minLength: [5, 'Name must be at least 5 characters long!'],
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
      trim: true,
      min: [1000, 'Price must be at least 1000'],
    },
    ratings: {
      type: mongoose.Schema.Types.Decimal128,
      trim: true,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    location: {
      type: String,
      required: [true, 'Location is required!'],
      trim: true,
      minLength: [4, 'Location name must be at least 4 characters long!'],
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Mahals', mahalsSchema);
