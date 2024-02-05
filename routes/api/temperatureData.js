const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const TemperatureData = require('../../models/TemperatureData');

// @route   GET api/temperatureData
// @desc    Get all temperature data
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const temperatureData = await TemperatureData.find().sort({ date: -1 });
    res.json(temperatureData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/temperatureData
// @desc    Add new temperature data
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { sensorId, temperature, timestamp } = req.body;

  try {
    const newTemperatureData = new TemperatureData({
      sensorId,
      temperature,
      timestamp
    });

    const temperatureData = await newTemperatureData.save();
    res.json(temperatureData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/temperatureData/:sensorId
// @desc    Get temperature data by sensor ID
// @access  Private
router.get('/:sensorId', authMiddleware, async (req, res) => {
  try {
    const temperatureData = await TemperatureData.find({ sensorId: req.params.sensorId }).sort({ date: -1 });
    res.json(temperatureData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/temperatureData/:id
// @desc    Delete temperature data
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const temperatureData = await TemperatureData.findById(req.params.id);

    if (!temperatureData) {
      return res.status(404).json({ msg: 'Temperature data not found' });
    }

    await temperatureData.remove();
    res.json({ msg: 'Temperature data removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Temperature data not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;