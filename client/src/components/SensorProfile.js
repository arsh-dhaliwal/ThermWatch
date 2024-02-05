import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';

const SensorProfile = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [sensorProfiles, setSensorProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSensorProfiles();
  }, []);

  const fetchSensorProfiles = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/sensorProfiles');
      setSensorProfiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sensor profiles:', error);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/sensorProfiles', data);
      setSensorProfiles([...sensorProfiles, response.data]);
      reset();
    } catch (error) {
      console.error('Error creating sensor profile:', error);
    }
  };

  return (
    <div className="sensor-profile-container">
      <h2>Sensor Profile Configuration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Sensor Name</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <p>Sensor name is required.</p>}
        </div>
        <div className="form-group">
          <label>Sensor Family</label>
          <select {...register('family', { required: true })}>
            <option value="RTD">RTD</option>
            <option value="Thermocouple">Thermocouple</option>
            {/* Add more sensor families as needed */}
          </select>
          {errors.family && <p>Sensor family is required.</p>}
        </div>
        <div className="form-group">
          <label>Sensor Type</label>
          <select {...register('type', { required: true })}>
            <option value="PT100">PT100</option>
            <option value="PT1000">PT1000</option>
            {/* Add more sensor types as needed */}
          </select>
          {errors.type && <p>Sensor type is required.</p>}
        </div>
        <div className="form-group">
          <label>Sensor Variant</label>
          <select {...register('variant', { required: true })}>
            <option value="2wire">2 wire</option>
            <option value="3wire">3 wire</option>
            <option value="4wire">4 wire</option>
            {/* Add more sensor variants as needed */}
          </select>
          {errors.variant && <p>Sensor variant is required.</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Sensor Profile'}
        </button>
      </form>
      <div className="sensor-profile-list">
        {loading ? (
          <p>Loading sensor profiles...</p>
        ) : (
          sensorProfiles.map(profile => (
            <div key={profile._id} className="sensor-profile-item">
              <p>Name: {profile.name}</p>
              <p>Family: {profile.family}</p>
              <p>Type: {profile.type}</p>
              <p>Variant: {profile.variant}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SensorProfile;