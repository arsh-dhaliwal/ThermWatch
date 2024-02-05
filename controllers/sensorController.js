const Sensor = require('../models/Sensor');
const Asset = require('../models/Asset');
const TemperatureData = require('../models/TemperatureData');
const TemperatureCalculatedData = require('../models/TemperatureCalculatedData');

// Get all sensors
exports.getSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find().populate('asset');
        res.json(sensors);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Get sensor by ID
exports.getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id).populate('asset');
        if (!sensor) {
            return res.status(404).json({ msg: 'Sensor not found' });
        }
        res.json(sensor);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Sensor not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Create or update a sensor
exports.createOrUpdateSensor = async (req, res) => {
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

        if (sensor) {
            // Update
            sensor = await Sensor.findByIdAndUpdate(
                req.params.id,
                { $set: sensorFields },
                { new: true }
            );
            return res.json(sensor);
        }

        // Create
        sensor = new Sensor(sensorFields);
        await sensor.save();
        res.json(sensor);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Delete sensor
exports.deleteSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);

        if (!sensor) {
            return res.status(404).json({ msg: 'Sensor not found' });
        }

        await sensor.remove();
        res.json({ msg: 'Sensor removed' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Sensor not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Get temperature data for a sensor
exports.getSensorTemperatureData = async (req, res) => {
    try {
        const temperatureData = await TemperatureData.find({ sensor: req.params.id });
        res.json(temperatureData);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Get calculated temperature data for a sensor
exports.getSensorCalculatedData = async (req, res) => {
    try {
        const calculatedData = await TemperatureCalculatedData.find({ sensor: req.params.id });
        res.json(calculatedData);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};