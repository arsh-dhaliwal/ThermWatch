const Asset = require('../models/Asset');
const Sensor = require('../models/Sensor');
const TemperatureData = require('../models/TemperatureData');
const TemperatureCalculatedData = require('../models/TemperatureCalculatedData');

// Get all assets for a specific plant
exports.getAssetsByPlant = async (req, res) => {
  try {
    const plantId = req.params.plantId;
    const assets = await Asset.find({ plant: plantId });
    res.json(assets);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Create a new asset
exports.createAsset = async (req, res) => {
  try {
    const { name, plant, capacity, rating, temperatureThreshold } = req.body;
    let asset = new Asset({
      name,
      plant,
      capacity,
      rating,
      temperatureThreshold
    });
    asset = await asset.save();
    res.json(asset);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Update an asset
exports.updateAsset = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const { name, plant, capacity, rating, temperatureThreshold } = req.body;
    let asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ msg: 'Asset not found' });
    }
    asset.name = name;
    asset.plant = plant;
    asset.capacity = capacity;
    asset.rating = rating;
    asset.temperatureThreshold = temperatureThreshold;
    await asset.save();
    res.json(asset);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Delete an asset
exports.deleteAsset = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    await Asset.findByIdAndRemove(assetId);
    res.json({ msg: 'Asset removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Get temperature data for an asset
exports.getTemperatureDataByAsset = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const temperatureData = await TemperatureData.find({ asset: assetId });
    res.json(temperatureData);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Get calculated temperature data for an asset
exports.getCalculatedTemperatureDataByAsset = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const calculatedData = await TemperatureCalculatedData.find({ asset: assetId });
    res.json(calculatedData);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Get sensors for an asset
exports.getSensorsByAsset = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const sensors = await Sensor.find({ asset: assetId });
    res.json(sensors);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};