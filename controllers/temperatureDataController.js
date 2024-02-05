const TemperatureData = require('../models/TemperatureData');
const Sensor = require('../models/Sensor');

// Get temperature data for a specific sensor
exports.getTemperatureDataBySensor = async (req, res) => {
  try {
    const sensorId = req.params.sensorId;
    const temperatureData = await TemperatureData.find({ sensor: sensorId });
    res.json(temperatureData);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Post new temperature data
exports.addTemperatureData = async (req, res) => {
  try {
    const { sensorId, temperature, timestamp } = req.body;
    const sensor = await Sensor.findById(sensorId);

    if (!sensor) {
      return res.status(404).json({ msg: 'Sensor not found' });
    }

    const newTemperatureData = new TemperatureData({
      sensor: sensorId,
      temperature,
      timestamp
    });

    const savedTemperatureData = await newTemperatureData.save();
    res.json(savedTemperatureData);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Update temperature data
exports.updateTemperatureData = async (req, res) => {
  try {
    const { temperatureDataId, temperature, timestamp } = req.body;
    let temperatureData = await TemperatureData.findById(temperatureDataId);

    if (!temperatureData) {
      return res.status(404).json({ msg: 'Temperature data not found' });
    }

    temperatureData.temperature = temperature;
    temperatureData.timestamp = timestamp;

    await temperatureData.save();
    res.json(temperatureData);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Delete temperature data
exports.deleteTemperatureData = async (req, res) => {
  try {
    const temperatureDataId = req.params.temperatureDataId;
    const temperatureData = await TemperatureData.findById(temperatureDataId);

    if (!temperatureData) {
      return res.status(404).json({ msg: 'Temperature data not found' });
    }

    await temperatureData.remove();
    res.json({ msg: 'Temperature data removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};