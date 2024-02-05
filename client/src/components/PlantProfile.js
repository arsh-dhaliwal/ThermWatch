import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { PlantContext } from '../context/PlantContext';
import api from '../utils/api';

const PlantProfile = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { plants, setPlants } = useContext(PlantContext);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    // Fetch plants when component mounts
    const fetchPlants = async () => {
      try {
        const response = await api.get('/api/plants');
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, [setPlants]);

  const onSubmit = async (data) => {
    try {
      const response = selectedPlant
        ? await api.put(`/api/plants/${selectedPlant._id}`, data)
        : await api.post('/api/plants', data);
      setPlants([...plants, response.data]);
      reset();
    } catch (error) {
      console.error('Error submitting plant profile:', error);
    }
  };

  const handleEditClick = (plant) => {
    setSelectedPlant(plant);
    reset(plant);
  };

  return (
    <div className="plant-profile-container">
      <h2>Plant Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="plantName">Plant Name</label>
          <input
            id="plantName"
            name="name"
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name && <p>Plant name is required.</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            {...register('address', { required: true })}
          />
          {errors.address && <p>Address is required.</p>}
        </div>
        {/* Add more input fields as necessary */}
        <button type="submit">{selectedPlant ? 'Update' : 'Create'}</button>
      </form>
      <div className="plant-list">
        {plants.map((plant) => (
          <div key={plant._id} className="plant-item">
            <span>{plant.name}</span>
            <button onClick={() => handleEditClick(plant)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantProfile;