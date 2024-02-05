const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');
const Company = require('../../models/Company');

// @route   POST api/companies
// @desc    Create or update a company profile
// @access  Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('name', 'Company name is required').not().isEmpty(),
      check('address', 'Address is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty(),
      check('stateProvince', 'State or province is required').not().isEmpty(),
      check('country', 'Country is required').not().isEmpty(),
      check('zipPostalCode', 'Zip or postal code is required').not().isEmpty(),
      check('phoneNumber', 'Phone number is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      address,
      city,
      stateProvince,
      country,
      zipPostalCode,
      phoneNumber,
      email,
    } = req.body;

    const companyFields = {
      user: req.user.id,
      name,
      address,
      city,
      stateProvince,
      country,
      zipPostalCode,
      phoneNumber,
      email,
    };

    try {
      let company = await Company.findOne({ user: req.user.id });

      if (company) {
        // Update
        company = await Company.findOneAndUpdate(
          { user: req.user.id },
          { $set: companyFields },
          { new: true }
        );

        return res.json(company);
      }

      // Create
      company = new Company(companyFields);
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/companies
// @desc    Get all companies
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const companies = await Company.find().populate('user', ['name', 'email']);
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/companies/:company_id
// @desc    Get company by ID
// @access  Private
router.get('/:company_id', authMiddleware, async (req, res) => {
  try {
    const company = await Company.findById(req.params.company_id).populate('user', ['name', 'email']);

    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/companies/:company_id
// @desc    Delete company, plants, and assets
// @access  Private
router.delete('/:company_id', authMiddleware, async (req, res) => {
  try {
    // Remove company
    await Company.findByIdAndRemove(req.params.company_id);

    // TODO: Remove associated plants and assets

    res.json({ msg: 'Company removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;