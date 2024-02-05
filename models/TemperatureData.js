const mongoose = require('mongoose');

const TemperatureDataSchema = new mongoose.Schema({
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  sampleTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TemperatureData', TemperatureDataSchema);