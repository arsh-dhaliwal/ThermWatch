const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Asset Schema definition
const AssetSchema = new Schema({
  assetName: {
    type: String,
    required: true
  },
  plant: {
    type: Schema.Types.ObjectId,
    ref: 'Plant',
    required: true
  },
  capacity: {
    type: Number,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  temperatureThreshold: {
    type: Number,
    required: true
  },
  sensors: [{
    type: Schema.Types.ObjectId,
    ref: 'Sensor'
  }]
}, {
  timestamps: true
});

// Asset model based on the schema
const Asset = mongoose.model('Asset', AssetSchema);

module.exports = Asset;