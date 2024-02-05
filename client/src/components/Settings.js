import React, { useState, useEffect } from 'react';
import CompanyProfile from './CompanyProfile';
import PlantProfile from './PlantProfile';
import AssetProfile from './AssetProfile';
import SensorProfile from './SensorProfile';
import DAQConfiguration from './DAQConfiguration';
import AlarmConfiguration from './AlarmConfiguration';
import { api } from '../utils/api';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'company':
        return <CompanyProfile />;
      case 'plant':
        return <PlantProfile />;
      case 'asset':
        return <AssetProfile />;
      case 'sensor':
        return <SensorProfile />;
      case 'daq':
        return <DAQConfiguration />;
      case 'alarm':
        return <AlarmConfiguration />;
      default:
        return <CompanyProfile />;
    }
  };

  useEffect(() => {
    // Fetch initial settings data if needed
    // api.get('/settings').then((response) => {
    //   console.log(response.data);
    // });
  }, []);

  return (
    <div className="settings-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => handleTabClick('company')}
        >
          Company Profile
        </button>
        <button
          className={`tab ${activeTab === 'plant' ? 'active' : ''}`}
          onClick={() => handleTabClick('plant')}
        >
          Plant Profile
        </button>
        <button
          className={`tab ${activeTab === 'asset' ? 'active' : ''}`}
          onClick={() => handleTabClick('asset')}
        >
          Asset Profile
        </button>
        <button
          className={`tab ${activeTab === 'sensor' ? 'active' : ''}`}
          onClick={() => handleTabClick('sensor')}
        >
          Sensor Profile
        </button>
        <button
          className={`tab ${activeTab === 'daq' ? 'active' : ''}`}
          onClick={() => handleTabClick('daq')}
        >
          DAQ Configuration
        </button>
        <button
          className={`tab ${activeTab === 'alarm' ? 'active' : ''}`}
          onClick={() => handleTabClick('alarm')}
        >
          Alarm Configuration
        </button>
      </div>
      <div className="active-tab-content">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Settings;