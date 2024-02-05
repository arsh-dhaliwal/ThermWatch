import axios from 'axios';

const API_URL = '/api';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const api = {
  // User Authentication
  login: (email, password) => axios.post(`${API_URL}/users/login`, { email, password }),
  signup: (userData) => axios.post(`${API_URL}/users/signup`, userData),
  logout: () => localStorage.removeItem('user'),

  // Company Profile
  getCompanyProfile: () => axios.get(`${API_URL}/companies/profile`, { headers: getHeaders() }),
  updateCompanyProfile: (companyData) => axios.put(`${API_URL}/companies/profile`, companyData, { headers: getHeaders() }),

  // Plant Profile
  getPlantProfiles: () => axios.get(`${API_URL}/plants`, { headers: getHeaders() }),
  updatePlantProfile: (plantId, plantData) => axios.put(`${API_URL}/plants/${plantId}`, plantData, { headers: getHeaders() }),

  // Asset Profile
  getAssetProfiles: (plantId) => axios.get(`${API_URL}/assets/plant/${plantId}`, { headers: getHeaders() }),
  updateAssetProfile: (assetId, assetData) => axios.put(`${API_URL}/assets/${assetId}`, assetData, { headers: getHeaders() }),

  // Sensor Profile
  getSensorProfiles: () => axios.get(`${API_URL}/sensors/profiles`, { headers: getHeaders() }),
  updateSensorProfile: (sensorId, sensorData) => axios.put(`${API_URL}/sensors/profiles/${sensorId}`, sensorData, { headers: getHeaders() }),

  // Temperature Data
  getTemperatureData: (sensorId) => axios.get(`${API_URL}/temperatureData/sensor/${sensorId}`, { headers: getHeaders() }),
  postTemperatureData: (sensorId, temperatureData) => axios.post(`${API_URL}/temperatureData/sensor/${sensorId}`, temperatureData, { headers: getHeaders() }),

  // Temperature Calculated Data
  getTemperatureCalculatedData: (sensorId) => axios.get(`${API_URL}/temperatureCalculatedData/sensor/${sensorId}`, { headers: getHeaders() }),

  // DAQ Configuration
  getDAQConfiguration: () => axios.get(`${API_URL}/daq/configuration`, { headers: getHeaders() }),
  updateDAQConfiguration: (daqConfigData) => axios.put(`${API_URL}/daq/configuration`, daqConfigData, { headers: getHeaders() }),

  // Alarm Configuration
  getAlarmConfiguration: () => axios.get(`${API_URL}/alarms/configuration`, { headers: getHeaders() }),
  updateAlarmConfiguration: (alarmConfigData) => axios.put(`${API_URL}/alarms/configuration`, alarmConfigData, { headers: getHeaders() }),
};

export default api;