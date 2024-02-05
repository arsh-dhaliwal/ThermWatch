const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const TemperatureCalculatedData = require('../../models/TemperatureCalculatedData');

// @route   GET api/temperatureCalculatedData
// @desc    Get all calculated temperature data
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const calculatedData = await TemperatureCalculatedData.find();
    res.json(calculatedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/temperatureCalculatedData
// @desc    Add new calculated temperature data
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { sensorId, maxTemperature, minTemperature, avgTemperature, alarmsTriggered } = req.body;

  try {
    const newCalculatedData = new TemperatureCalculatedData({
      sensorId,
      maxTemperature,
      minTemperature,
      avgTemperature,
      alarmsTriggered
    });

    const calculatedData = await newCalculatedData.save();
    res.json(calculatedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/temperatureCalculatedData/:id
// @desc    Update calculated temperature data
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { maxTemperature, minTemperature, avgTemperature, alarmsTriggered } = req.body;

  // Build calculated data object
  const calculatedDataFields = {};
  if (maxTemperature) calculatedDataFields.maxTemperature = maxTemperature;
  if (minTemperature) calculatedDataFields.minTemperature = minTemperature;
  if (avgTemperature) calculatedDataFields.avgTemperature = avgTemperature;
  if (alarmsTriggered) calculatedDataFields.alarmsTriggered = alarmsTriggered;

  try {
    let calculatedData = await TemperatureCalculatedData.findById(req.params.id);

    if (!calculatedData) return res.status(404).json({ msg: 'Calculated data not found' });

    calculatedData = await TemperatureCalculatedData.findByIdAndUpdate(
      req.params.id,
      { $set: calculatedDataFields },
      { new: true }
    );

    res.json(calculatedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/temperatureCalculatedData/:id
// @desc    Delete calculated temperature data
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let calculatedData = await TemperatureCalculatedData.findById(req.params.id);

    if (!calculatedData) return res.status(404).json({ msg: 'Calculated data not found' });

    await TemperatureCalculatedData.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Calculated data removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;