import React, { useContext, useEffect, useState } from 'react';
import { PlantContext } from '../context/PlantContext';
import PlantPage from './PlantPage';
import AssetDashboard from './AssetDashboard';
import { fetchSensorData } from '../hooks/useSensorData';
import Notification from './Notification';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { plants, setPlants, selectedPlant, setSelectedPlant } = useContext(PlantContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Fetch plants data from the API and update state
      // This is a placeholder function, replace with actual data fetching logic
      const fetchPlants = async () => {
        try {
          const data = await fetchSensorData('/api/plants');
          setPlants(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching plants:', error);
          setLoading(false);
        }
      };

      fetchPlants();
    }
  }, [isAuthenticated, navigate, setPlants]);

  const handlePlantSelection = (plantId) => {
    // Find the selected plant by its ID and update the context
    const plant = plants.find((p) => p._id === plantId);
    setSelectedPlant(plant);
  };

  return (
    <div className="dashboard-container bg-dark text-blue-500">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {selectedPlant ? (
            <AssetDashboard />
          ) : (
            <PlantPage plants={plants} onPlantSelection={handlePlantSelection} />
          )}
          <Notification />
        </>
      )}
    </div>
  );
};

export default Dashboard;