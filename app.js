const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/api/users');
const companyRoutes = require('./routes/api/companies');
const plantRoutes = require('./routes/api/plants');
const assetRoutes = require('./routes/api/assets');
const sensorRoutes = require('./routes/api/sensors');
const temperatureDataRoutes = require('./routes/api/temperatureData');
const temperatureCalculatedDataRoutes = require('./routes/api/temperatureCalculatedData');
const sensorProfileRoutes = require('./routes/api/sensorProfiles');

const { dbURI } = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/temperatureData', temperatureDataRoutes);
app.use('/api/temperatureCalculatedData', temperatureCalculatedDataRoutes);
app.use('/api/sensorProfiles', sensorProfileRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Use Auth Middleware
app.use(authMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Note: To add the logo for ThermWatch, place the logo file in the client/public directory
// and reference it in the client/public/index.html file. Instructions for this are provided in the README.md.