const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/plants
// @desc    Get all plants for a user's company
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const plants = await Plant.find({ company: req.user.company }).sort({ date: -1 });
    res.json(plants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/plants
// @desc    Add new plant
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { name, address, city, state, country, zipCode, phoneNumber, email } = req.body;

  try {
    const newPlant = new Plant({
      name,
      address,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      email,
      company: req.user.company
    });

    const plant = await newPlant.save();
    res.json(plant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/plants/:id
// @desc    Update plant
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, address, city, state, country, zipCode, phoneNumber, email } = req.body;

  // Build plant object
  const plantFields = {};
  if (name) plantFields.name = name;
  if (address) plantFields.address = address;
  if (city) plantFields.city = city;
  if (state) plantFields.state = state;
  if (country) plantFields.country = country;
  if (zipCode) plantFields.zipCode = zipCode;
  if (phoneNumber) plantFields.phoneNumber = phoneNumber;
  if (email) plantFields.email = email;

  try {
    let plant = await Plant.findById(req.params.id);

    if (!plant) return res.status(404).json({ msg: 'Plant not found' });

    // Make sure user owns plant
    if (plant.company.toString() !== req.user.company) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    plant = await Plant.findByIdAndUpdate(
      req.params.id,
      { $set: plantFields },
      { new: true }
    );

    res.json(plant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/plants/:id
// @desc    Delete plant
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let plant = await Plant.findById(req.params.id);

    if (!plant) return res.status(404).json({ msg: 'Plant not found' });

    // Make sure user owns plant
    if (plant.company.toString() !== req.user.company) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Plant.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Plant removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;