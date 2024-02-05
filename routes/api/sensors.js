const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/sensors
// @desc    Get all sensors
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sensors = await Sensor.find().populate('asset', ['name', 'plant']);
    res.json(sensors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/sensors
// @desc    Add a new sensor
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { name, sensorFamily, sensorType, sensorVariant, asset, position } = req.body;

  try {
    let sensor = new Sensor({
      name,
      sensorFamily,
      sensorType,
      sensorVariant,
      asset,
      position
    });

    await sensor.save();
    res.json(sensor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/sensors/:id
// @desc    Update a sensor
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, sensorFamily, sensorType, sensorVariant, asset, position } = req.body;

  // Build sensor object
  const sensorFields = {};
  if (name) sensorFields.name = name;
  if (sensorFamily) sensorFields.sensorFamily = sensorFamily;
  if (sensorType) sensorFields.sensorType = sensorType;
  if (sensorVariant) sensorFields.sensorVariant = sensorVariant;
  if (asset) sensorFields.asset = asset;
  if (position) sensorFields.position = position;

  try {
    let sensor = await Sensor.findById(req.params.id);

    if (!sensor) return res.status(404).json({ msg: 'Sensor not found' });

    sensor = await Sensor.findByIdAndUpdate(
      req.params.id,
      { $set: sensorFields },
      { new: true }
    );

    res.json(sensor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/sensors/:id
// @desc    Delete a sensor
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let sensor = await Sensor.findById(req.params.id);

    if (!sensor) return res.status(404).json({ msg: 'Sensor not found' });

    await Sensor.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Sensor removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;