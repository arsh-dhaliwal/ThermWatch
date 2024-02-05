import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CompanyProfile from './CompanyProfile';
import PlantProfile from './PlantProfile';
import AssetProfile from './AssetProfile';
import SensorProfile from './SensorProfile';
import { setupCompanyProfile, setupPlantProfile, setupAssetProfile, setupSensorProfile } from '../utils/api';

const SetupWizard = () => {
  const [step, setStep] = useState(1);
  const history = useHistory();

  const handleCompanySubmit = async (companyData) => {
    await setupCompanyProfile(companyData);
    setStep(step + 1);
  };

  const handlePlantSubmit = async (plantData) => {
    await setupPlantProfile(plantData);
    setStep(step + 1);
  };

  const handleAssetSubmit = async (assetData) => {
    await setupAssetProfile(assetData);
    setStep(step + 1);
  };

  const handleSensorSubmit = async (sensorData) => {
    await setupSensorProfile(sensorData);
    history.push('/dashboard'); // Redirect to dashboard after setup is complete
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CompanyProfile onSubmit={handleCompanySubmit} />;
      case 2:
        return <PlantProfile onSubmit={handlePlantSubmit} />;
      case 3:
        return <AssetProfile onSubmit={handleAssetSubmit} />;
      case 4:
        return <SensorProfile onSubmit={handleSensorSubmit} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="setup-wizard">
      <h2>Setup Wizard</h2>
      <div className="wizard-step">
        {renderStep()}
      </div>
    </div>
  );
};

export default SetupWizard;