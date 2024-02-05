const Company = require('../models/Company');

// Create a new company profile
exports.createCompany = async (req, res) => {
    try {
        const { name, address, city, state, country, zipCode, phoneNumber, email } = req.body;
        const newCompany = new Company({
            name,
            address,
            city,
            state,
            country,
            zipCode,
            phoneNumber,
            email
        });

        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        res.status(500).json({ message: "Error creating company profile", error: error.message });
    }
};

// Retrieve all company profiles
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving company profiles", error: error.message });
    }
};

// Retrieve a single company profile by ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving company profile", error: error.message });
    }
};

// Update a company profile
exports.updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(500).json({ message: "Error updating company profile", error: error.message });
    }
};

// Delete a company profile
exports.deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        if (!deletedCompany) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ message: "Company profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting company profile", error: error.message });
    }
};