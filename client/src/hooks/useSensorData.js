import { useState, useEffect } from 'react';
import axios from 'axios';

const useSensorData = (assetId) => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/sensors/data/${assetId}`);
        setSensorData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (assetId) {
      fetchSensorData();
    }
  }, [assetId]);

  return { sensorData, loading, error };
};

export default useSensorData;