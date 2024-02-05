import React, { createContext, useState, useEffect } from 'react';
import { fetchPlants } from '../utils/api';

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlants = async () => {
      try {
        setLoading(true);
        const data = await fetchPlants();
        setPlants(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadPlants();
  }, []);

  const selectPlant = (plantId) => {
    const plant = plants.find(p => p._id === plantId);
    setSelectedPlant(plant);
  };

  return (
    <PlantContext.Provider value={{ plants, selectedPlant, selectPlant, loading, error }}>
      {children}
    </PlantContext.Provider>
  );
};