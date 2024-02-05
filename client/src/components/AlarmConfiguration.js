import React, { useState, useEffect } from 'react';
import { updateAlarmStatus } from '../utils/api';

const AlarmConfiguration = () => {
  const [percentageIncrease, setPercentageIncrease] = useState('');
  const [daysConsidered, setDaysConsidered] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current alarm configuration from the API
    // Placeholder for API call to fetch current settings
    // setPercentageIncrease(response.percentageIncrease);
    // setDaysConsidered(response.daysConsidered);
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Placeholder for API call to save alarm configuration
      await updateAlarmStatus({ percentageIncrease, daysConsidered });
      alert('Alarm configuration updated successfully!');
    } catch (err) {
      setError('Failed to update alarm configuration.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="alarm-configuration-container">
      <h2>Alarm Configuration</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="percentageIncrease">Percentage Increase Threshold:</label>
        <input
          type="number"
          id="percentageIncrease"
          value={percentageIncrease}
          onChange={(e) => setPercentageIncrease(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="daysConsidered">Days to Consider for Trend Analysis:</label>
        <input
          type="number"
          id="daysConsidered"
          value={daysConsidered}
          onChange={(e) => setDaysConsidered(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button onClick={handleSave} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Configuration'}
      </button>
    </div>
  );
};

export default AlarmConfiguration;