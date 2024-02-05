import React, { useState, useEffect, useContext } from 'react';
import { PlantContext } from '../context/PlantContext';
import api from '../utils/api';
import Notification from './Notification';

const AssetProfile = () => {
  const [assets, setAssets] = useState([]);
  const [selectedPlant, setSelectedPlant] = useContext(PlantContext);
  const [newAsset, setNewAsset] = useState({
    assetName: '',
    plant: '',
    capacity: '',
    rating: '',
    temperatureThreshold: ''
  });

  useEffect(() => {
    if (selectedPlant) {
      fetchAssets();
    }
  }, [selectedPlant]);

  const fetchAssets = async () => {
    try {
      const response = await api.get(`/api/assets/${selectedPlant._id}`);
      setAssets(response.data);
    } catch (error) {
      Notification('Error fetching assets', 'error');
    }
  };

  const handleInputChange = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/assets', { ...newAsset, plant: selectedPlant._id });
      setAssets([...assets, response.data]);
      setNewAsset({
        assetName: '',
        plant: '',
        capacity: '',
        rating: '',
        temperatureThreshold: ''
      });
      Notification('Asset created successfully', 'success');
    } catch (error) {
      Notification('Error creating asset', 'error');
    }
  };

  return (
    <div className="asset-profile-container">
      <h2>Asset Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="assetName">Asset Name:</label>
        <input
          type="text"
          id="assetName"
          name="assetName"
          value={newAsset.assetName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="capacity">Capacity:</label>
        <input
          type="text"
          id="capacity"
          name="capacity"
          value={newAsset.capacity}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="text"
          id="rating"
          name="rating"
          value={newAsset.rating}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="temperatureThreshold">Temperature Threshold:</label>
        <input
          type="number"
          id="temperatureThreshold"
          name="temperatureThreshold"
          value={newAsset.temperatureThreshold}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Asset</button>
      </form>

      <div className="assets-list">
        {assets.map((asset) => (
          <div key={asset._id} className="asset-item">
            <h3>{asset.assetName}</h3>
            <p>Capacity: {asset.capacity}</p>
            <p>Rating: {asset.rating}</p>
            <p>Temperature Threshold: {asset.temperatureThreshold}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetProfile;