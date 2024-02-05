import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlantContext } from '../context/PlantContext';
import { AssetContext } from '../context/AssetContext';
import { SensorContext } from '../context/SensorContext';
import RealTimePlot from './RealTimePlot';
import PolarTrendPlot from './PolarTrendPlot';
import ToggleUnit from './ToggleUnit';
import Notification from './Notification';
import api from '../utils/api';

const AssetDashboard = () => {
  const { plantId } = useParams();
  const { plants } = useContext(PlantContext);
  const { assets, setAssets } = useContext(AssetContext);
  const { sensors, setSensors } = useContext(SensorContext);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [unit, setUnit] = useState('Celsius');

  useEffect(() => {
    // Fetch assets for the selected plant
    api.get(`/api/assets/${plantId}`)
      .then(response => {
        setAssets(response.data);
      })
      .catch(error => console.error('Error fetching assets:', error));
  }, [plantId, setAssets]);

  useEffect(() => {
    // Fetch sensors for the selected asset
    if (selectedAsset) {
      api.get(`/api/sensors/${selectedAsset._id}`)
        .then(response => {
          setSensors(response.data);
        })
        .catch(error => console.error('Error fetching sensors:', error));
    }
  }, [selectedAsset, setSensors]);

  const handleAssetSelection = (asset) => {
    setSelectedAsset(asset);
  };

  const toggleTemperatureUnit = () => {
    setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };

  return (
    <div className="asset-dashboard-container">
      <div className="asset-selection">
        {assets.map(asset => (
          <div
            key={asset._id}
            className={`asset-widget ${asset.status}`}
            onClick={() => handleAssetSelection(asset)}
          >
            <h3>{asset.name}</h3>
            <p>Status: {asset.status}</p>
          </div>
        ))}
      </div>
      {selectedAsset && (
        <>
          <div className="asset-details">
            <h2>{selectedAsset.name}</h2>
            <ToggleUnit unit={unit} toggleUnit={toggleTemperatureUnit} />
          </div>
          <RealTimePlot sensors={sensors} unit={unit} />
          <PolarTrendPlot sensors={sensors} unit={unit} />
          {/* Additional plots and data visualizations can be added here */}
        </>
      )}
      <Notification />
    </div>
  );
};

export default AssetDashboard;