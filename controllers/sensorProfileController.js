const SensorProfile = require('../models/SensorProfile');

// Create a new sensor profile
exports.createSensorProfile = async (req, res) => {
    try {
        const { sensorFamily, sensorType, sensorVariant } = req.body;
        const sensorProfile = new SensorProfile({
            sensorFamily,
            sensorType,
            sensorVariant
        });

        await sensorProfile.save();
        res.status(201).json(sensorProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retrieve all sensor profiles
exports.getAllSensorProfiles = async (req, res) => {
    try {
        const sensorProfiles = await SensorProfile.find();
        res.status(200).json(sensorProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a single sensor profile by ID
exports.getSensorProfileById = async (req, res) => {
    try {
        const sensorProfile = await SensorProfile.findById(req.params.id);
        if (!sensorProfile) return res.status(404).json({ message: 'Sensor profile not found' });
        res.status(200).json(sensorProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a sensor profile
exports.updateSensorProfile = async (req, res) => {
    try {
        const updatedSensorProfile = await SensorProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedSensorProfile) return res.status(404).json({ message: 'Sensor profile not found' });
        res.status(200).json(updatedSensorProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a sensor profile
exports.deleteSensorProfile = async (req, res) => {
    try {
        const sensorProfile = await SensorProfile.findByIdAndDelete(req.params.id);
        if (!sensorProfile) return res.status(404).json({ message: 'Sensor profile not found' });
        res.status(200).json({ message: 'Sensor profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};