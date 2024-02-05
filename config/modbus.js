```javascript
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

const modbusConfig = {
  host: process.env.MODBUS_HOST || 'localhost',
  port: process.env.MODBUS_PORT || 502,
  unitId: process.env.MODBUS_UNIT_ID || 1,
  timeout: process.env.MODBUS_TIMEOUT || 5000
};

// Connect to Modbus server using TCP.
const connectModbusTCP = async () => {
  try {
    await client.connectTCP(modbusConfig.host, { port: modbusConfig.port });
    client.setID(modbusConfig.unitId);
    client.setTimeout(modbusConfig.timeout);
    console.log(`Connected to Modbus server at ${modbusConfig.host}:${modbusConfig.port}`);
  } catch (error) {
    console.error("Modbus TCP Connection Error: ", error);
  }
};

// Read data from a Modbus slave.
const readModbusData = async (address, length) => {
  try {
    await connectModbusTCP();
    const data = await client.readHoldingRegisters(address, length);
    return data.data;
  } catch (error) {
    console.error("Modbus Read Error: ", error);
    return null;
  } finally {
    if (client.isOpen) {
      client.close();
    }
  }
};

module.exports = {
  connectModbusTCP,
  readModbusData,
  modbusConfig
};
```