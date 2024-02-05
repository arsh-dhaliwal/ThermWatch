// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const usersRoutes = require('./routes/api/users');
const companiesRoutes = require('./routes/api/companies');
const plantsRoutes = require('./routes/api/plants');
const assetsRoutes = require('./routes/api/assets');
const sensorsRoutes = require('./routes/api/sensors');
const temperatureDataRoutes = require('./routes/api/temperatureData');
const temperatureCalculatedDataRoutes = require('./routes/api/temperatureCalculatedData');
const sensorProfilesRoutes = require('./routes/api/sensorProfiles');

// Import configuration
const { dbURI } = require('./config/db');

// Initialize express app
const app = express();

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Use Routes
app.use('/api/users', usersRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/plants', plantsRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/sensors', sensorsRoutes);
app.use('/api/temperature-data', temperatureDataRoutes);
app.use('/api/temperature-calculated-data', temperatureCalculatedDataRoutes);
app.use('/api/sensor-profiles', sensorProfilesRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));