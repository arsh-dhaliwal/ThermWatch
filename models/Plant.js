const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  companyName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  plantName: {
    type: String,
    required: [true, 'Please add a plant name'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
    trim: true
  },
  stateProvince: {
    type: String,
    required: [true, 'Please add a state or province'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
    trim: true
  },
  zipPostalCode: {
    type: String,
    required: [true, 'Please add a zip or postal code'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please add a phone number'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  }
});

module.exports = mongoose.model('Plant', PlantSchema);