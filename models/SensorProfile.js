const mongoose = require('mongoose');

const SensorProfileSchema = new mongoose.Schema({
  sensorFamily: {
    type: String,
    required: true,
    enum: ['RTD', 'Thermocouple', 'Other'], // Default families, 'Other' can be used for custom additions
  },
  sensorType: {
    type: String,
    required: true,
  },
  sensorVariant: {
    type: String,
    required: true,
    enum: ['2 wire', '3 wire', '4 wire'], // Default variants for RTDs
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// SensorProfile model based on the schema
const SensorProfile = mongoose.model('SensorProfile', SensorProfileSchema);

module.exports = SensorProfile;