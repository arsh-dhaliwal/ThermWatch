import React, { useState } from 'react';
import { configureModbus, configureMQTT } from '../utils/api';

const DAQConfiguration = () => {
  const [modbusConfig, setModbusConfig] = useState({
    ipAddress: '',
    port: '',
    unitId: '',
    useModbus: false
  });
  const [mqttConfig, setMqttConfig] = useState({
    brokerUrl: '',
    topic: '',
    useMQTT: false
  });

  const handleModbusChange = (e) => {
    setModbusConfig({ ...modbusConfig, [e.target.name]: e.target.value });
  };

  const handleMqttChange = (e) => {
    setMqttConfig({ ...mqttConfig, [e.target.name]: e.target.value });
  };

  const submitModbusConfig = async (e) => {
    e.preventDefault();
    try {
      await configureModbus(modbusConfig);
      alert('Modbus configuration saved successfully.');
    } catch (error) {
      alert('Error saving Modbus configuration: ' + error.message);
    }
  };

  const submitMqttConfig = async (e) => {
    e.preventDefault();
    try {
      await configureMQTT(mqttConfig);
      alert('MQTT configuration saved successfully.');
    } catch (error) {
      alert('Error saving MQTT configuration: ' + error.message);
    }
  };

  return (
    <div className="daq-configuration">
      <h2>DAQ Configuration</h2>
      <form onSubmit={submitModbusConfig}>
        <h3>Modbus Configuration</h3>
        <label>
          IP Address:
          <input type="text" name="ipAddress" value={modbusConfig.ipAddress} onChange={handleModbusChange} />
        </label>
        <label>
          Port:
          <input type="text" name="port" value={modbusConfig.port} onChange={handleModbusChange} />
        </label>
        <label>
          Unit ID:
          <input type="text" name="unitId" value={modbusConfig.unitId} onChange={handleModbusChange} />
        </label>
        <label>
          Use Modbus:
          <input type="checkbox" name="useModbus" checked={modbusConfig.useModbus} onChange={(e) => setModbusConfig({ ...modbusConfig, useModbus: e.target.checked })} />
        </label>
        <button type="submit">Save Modbus Configuration</button>
      </form>

      <form onSubmit={submitMqttConfig}>
        <h3>MQTT Configuration</h3>
        <label>
          Broker URL:
          <input type="text" name="brokerUrl" value={mqttConfig.brokerUrl} onChange={handleMqttChange} />
        </label>
        <label>
          Topic:
          <input type="text" name="topic" value={mqttConfig.topic} onChange={handleMqttChange} />
        </label>
        <label>
          Use MQTT:
          <input type="checkbox" name="useMQTT" checked={mqttConfig.useMQTT} onChange={(e) => setMqttConfig({ ...mqttConfig, useMQTT: e.target.checked })} />
        </label>
        <button type="submit">Save MQTT Configuration</button>
      </form>
    </div>
  );
};

export default DAQConfiguration;