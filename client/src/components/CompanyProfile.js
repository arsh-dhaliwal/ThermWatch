import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const CompanyProfile = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  const onSubmit = data => {
    api.post('/api/companies', data)
      .then(response => {
        setMessage('Company profile saved successfully!');
      })
      .catch(error => {
        setMessage('Error saving company profile.');
      });
  };

  return (
    <div className="company-profile-container" id="companyProfileForm">
      <h2>Company Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            ref={register({ required: true })}
          />
          {errors.companyName && <p>Company name is required.</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            ref={register({ required: true })}
          />
          {errors.address && <p>Address is required.</p>}
        </div>
        {/* Add more input fields for city, state/province, etc. */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={register({ required: true })}
          />
          {errors.email && <p>Email is required.</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            ref={register({ required: true })}
          />
          {errors.phone && <p>Phone number is required.</p>}
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save Profile
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CompanyProfile;