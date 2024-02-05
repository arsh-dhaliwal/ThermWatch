const express = require('express');
const router = express.Router();
const SensorProfile = require('../models/SensorProfile');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/sensorProfiles
// @desc    Get all sensor profiles
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sensorProfiles = await SensorProfile.find();
    res.json(sensorProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/sensorProfiles
// @desc    Create or update a sensor profile
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { sensorFamily, sensorType, sensorVariant } = req.body;

  // Build sensor profile object
  const sensorProfileFields = {};
  if (sensorFamily) sensorProfileFields.sensorFamily = sensorFamily;
  if (sensorType) sensorProfileFields.sensorType = sensorType;
  if (sensorVariant) sensorProfileFields.sensorVariant = sensorVariant;

  try {
    let sensorProfile = await SensorProfile.findOne({ sensorFamily });

    if (sensorProfile) {
      // Update
      sensorProfile = await SensorProfile.findOneAndUpdate(
        { sensorFamily },
        { $set: sensorProfileFields },
        { new: true }
      );
      return res.json(sensorProfile);
    }

    // Create
    sensorProfile = new SensorProfile(sensorProfileFields);
    await sensorProfile.save();
    res.json(sensorProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/sensorProfiles/:id
// @desc    Delete a sensor profile
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await SensorProfile.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Sensor profile removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Sensor profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;