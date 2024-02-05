const mongoose = require('mongoose');

const TemperatureCalculatedDataSchema = new mongoose.Schema({
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  maximumTemperature: {
    type: Number,
    required: true
  },
  minimumTemperature: {
    type: Number,
    required: true
  },
  averageTemperature: {
    type: Number,
    required: true
  },
  alarmTriggered: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('TemperatureCalculatedData', TemperatureCalculatedDataSchema);