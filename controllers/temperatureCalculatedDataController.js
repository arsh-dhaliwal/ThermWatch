const TemperatureData = require('../models/TemperatureData');
const TemperatureCalculatedData = require('../models/TemperatureCalculatedData');

// Helper function to calculate daily statistics
const calculateDailyStats = (temperatures) => {
  let max = -Infinity;
  let min = Infinity;
  let sum = 0;
  let alarmTriggered = false;

  temperatures.forEach(temp => {
    if (temp.value > max) max = temp.value;
    if (temp.value < min) min = temp.value;
    sum += temp.value;
    if (temp.alarmTriggered) alarmTriggered = true;
  });

  const average = sum / temperatures.length;

  return { max, min, average, alarmTriggered };
};

// Controller function to calculate and store daily temperature statistics
const calculateAndStoreDailyStats = async (req, res) => {
  try {
    // Retrieve all temperature data for the previous day
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const startOfDay = new Date(yesterday.setHours(0, 0, 0, 0));
    const endOfDay = new Date(yesterday.setHours(23, 59, 59, 999));

    const temperatureData = await TemperatureData.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    // Group temperature data by sensor
    const groupedBySensor = temperatureData.reduce((acc, data) => {
      if (!acc[data.sensor]) {
        acc[data.sensor] = [];
      }
      acc[data.sensor].push(data);
      return acc;
    }, {});

    // Calculate daily stats for each sensor
    const calculatedStats = [];
    for (const sensorId in groupedBySensor) {
      const stats = calculateDailyStats(groupedBySensor[sensorId]);
      calculatedStats.push({
        sensor: sensorId,
        ...stats,
        date: startOfDay
      });
    }

    // Store calculated stats in the database
    await TemperatureCalculatedData.insertMany(calculatedStats);

    res.status(200).json({ message: 'Daily temperature statistics calculated and stored successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating daily temperature statistics', error });
  }
};

module.exports = {
  calculateAndStoreDailyStats
};