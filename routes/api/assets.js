const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const Asset = require('../../models/Asset');
const Plant = require('../../models/Plant');

// @route   GET api/assets
// @desc    Get all assets
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const assets = await Asset.find().populate('plant');
    res.json(assets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/assets
// @desc    Create a new asset
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { name, plantId, capacity, rating, temperatureThreshold } = req.body;

  try {
    // Check if plant exists
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ msg: 'Plant not found' });
    }

    const newAsset = new Asset({
      name,
      plant: plantId,
      capacity,
      rating,
      temperatureThreshold
    });

    const asset = await newAsset.save();
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/assets/:id
// @desc    Update an asset
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, plantId, capacity, rating, temperatureThreshold } = req.body;

  try {
    let asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ msg: 'Asset not found' });
    }

    // Check if plant exists
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ msg: 'Plant not found' });
    }

    asset = await Asset.findByIdAndUpdate(
      req.params.id,
      { $set: { name, plant: plantId, capacity, rating, temperatureThreshold } },
      { new: true }
    );

    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/assets/:id
// @desc    Delete an asset
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ msg: 'Asset not found' });
    }

    await asset.remove();
    res.json({ msg: 'Asset removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Asset not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;