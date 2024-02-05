const Plant = require('../models/Plant');
const Asset = require('../models/Asset');

// Get all plants for a company
exports.getPlants = async (req, res) => {
    try {
        const plants = await Plant.find({ company: req.params.companyId });
        res.json(plants);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Get a single plant by ID
exports.getPlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ msg: 'Plant not found' });
        }
        res.json(plant);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Plant not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Create a new plant
exports.createPlant = async (req, res) => {
    try {
        const newPlant = new Plant({
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zipCode: req.body.zipCode,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            company: req.body.company
        });

        const plant = await newPlant.save();
        res.json(plant);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Update a plant
exports.updatePlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ msg: 'Plant not found' });
        }

        const { name, address, city, state, country, zipCode, phoneNumber, email } = req.body;
        if (name) plant.name = name;
        if (address) plant.address = address;
        if (city) plant.city = city;
        if (state) plant.state = state;
        if (country) plant.country = country;
        if (zipCode) plant.zipCode = zipCode;
        if (phoneNumber) plant.phoneNumber = phoneNumber;
        if (email) plant.email = email;

        await plant.save();
        res.json(plant);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Delete a plant
exports.deletePlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ msg: 'Plant not found' });
        }

        // Delete associated assets before deleting the plant
        await Asset.deleteMany({ plant: req.params.id });

        await plant.remove();
        res.json({ msg: 'Plant removed' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Plant not found' });
        }
        res.status(500).send('Server Error');
    }
};