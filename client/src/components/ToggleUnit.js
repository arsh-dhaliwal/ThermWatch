import React, { useContext, useState } from 'react';
import { AssetContext } from '../context/AssetContext';

const ToggleUnit = () => {
  const { isCelsius, setIsCelsius } = useContext(AssetContext);
  const [unit, setUnit] = useState(isCelsius ? 'Celsius' : 'Fahrenheit');

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
    setUnit(isCelsius ? 'Fahrenheit' : 'Celsius');
  };

  return (
    <div className="toggle-unit-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={isCelsius}
          onChange={toggleTemperatureUnit}
        />
        <span className="slider round"></span>
      </label>
      <span className="unit-label">{unit}</span>
    </div>
  );
};

export default ToggleUnit;