const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sensor schema definition
const SensorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  family: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    required: true
  },
  asset: {
    type: Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  sampleRate: {
    type: Number,
    default: 60 // Sample rate in seconds
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create a model using the schema
const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;