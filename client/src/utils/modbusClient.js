import ModbusRTU from 'modbus-serial';
import { modbusConfig } from '../config/modbus';

// Create a Modbus client
const modbusClient = new ModbusRTU();

// Function to connect to the Modbus server
const connectModbus = async () => {
  try {
    await modbusClient.connectTCP(modbusConfig.host, { port: modbusConfig.port });
    modbusClient.setID(modbusConfig.unitId);
    console.log('Connected to Modbus server.');
  } catch (error) {
    console.error('Modbus connection failed:', error);
  }
};

// Function to read temperature data from a sensor
const readTemperature = async (sensorAddress, length) => {
  try {
    // Assuming temperature registers are holding registers
    const data = await modbusClient.readHoldingRegisters(sensorAddress, length);
    return data.data;
  } catch (error) {
    console.error('Failed to read temperature data:', error);
    return null;
  }
};

// Function to close the Modbus connection
const closeModbusConnection = () => {
  if (modbusClient.isOpen) {
    modbusClient.close(() => {
      console.log('Modbus connection closed.');
    });
  }
};

export { connectModbus, readTemperature, closeModbusConnection };