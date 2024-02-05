import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PlantContext } from '../context/PlantContext';
import api from '../utils/api';
import Notification from './Notification';

const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setPlant } = useContext(PlantContext);
  const history = useHistory();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await api.get('/api/plants');
        setPlants(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  const handlePlantSelect = (plant) => {
    setPlant(plant);
    history.push(`/assets/${plant._id}`);
  };

  if (loading) {
    return <div>Loading plants...</div>;
  }

  return (
    <div className="plant-page-container">
      <Notification />
      <h2>Select a Plant</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map((plant) => (
          <div
            key={plant._id}
            className="plant-widget bg-dark-blue text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-700"
            onClick={() => handlePlantSelect(plant)}
          >
            <h3>{plant.name}</h3>
            <p>{plant.address}</p>
            <p>{plant.city}, {plant.state}</p>
            <p>{plant.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantPage;