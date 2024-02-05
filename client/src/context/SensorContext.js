import React, { createContext, useState, useEffect } from 'react';
import { fetchSensorData } from '../utils/api';

export const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSensors = async () => {
      try {
        setLoading(true);
        const data = await fetchSensorData();
        setSensors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSensors();
  }, []);

  const addSensor = async (sensor) => {
    try {
      // Add API call to add sensor
      // const response = await apiCallToAddSensor(sensor);
      // setSensors([...sensors, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateSensor = async (sensorId, updatedSensor) => {
    try {
      // Add API call to update sensor
      // const response = await apiCallToUpdateSensor(sensorId, updatedSensor);
      // setSensors(sensors.map(sensor => sensor._id === sensorId ? response.data : sensor));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSensor = async (sensorId) => {
    try {
      // Add API call to delete sensor
      // await apiCallToDeleteSensor(sensorId);
      // setSensors(sensors.filter(sensor => sensor._id !== sensorId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SensorContext.Provider value={{ sensors, addSensor, updateSensor, deleteSensor, loading, error }}>
      {children}
    </SensorContext.Provider>
  );
};