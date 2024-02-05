const mqtt = require('mqtt');
const { MQTT_HOST, MQTT_PORT, MQTT_USERNAME, MQTT_PASSWORD } = process.env;

// MQTT client configuration
const mqttConfig = {
  host: MQTT_HOST || 'localhost',
  port: MQTT_PORT || 1883,
  username: MQTT_USERNAME || '',
  password: MQTT_PASSWORD || '',
  connectTimeout: 5000,
  reconnectPeriod: 1000,
};

// Function to create and configure the MQTT client
const configureMQTT = () => {
  const client = mqtt.connect(`mqtt://${mqttConfig.host}:${mqttConfig.port}`, {
    username: mqttConfig.username,
    password: mqttConfig.password,
    connectTimeout: mqttConfig.connectTimeout,
    reconnectPeriod: mqttConfig.reconnectPeriod,
  });

  client.on('connect', () => {
    console.log('MQTT Client Connected');
    // Here you can subscribe to the topics you are interested in.
    // Example: client.subscribe('sensor/temperature');
  });

  client.on('message', (topic, message) => {
    // Handle incoming messages.
    console.log(`Received message on ${topic}: ${message.toString()}`);
    // Here you can parse the message and store it in the database or perform other actions.
  });

  client.on('error', (error) => {
    console.error('MQTT Client Error:', error);
  });

  client.on('reconnect', () => {
    console.log('MQTT Client Reconnecting...');
  });

  client.on('close', () => {
    console.log('MQTT Client Disconnected');
  });

  return client;
};

module.exports = {
  mqttConfig,
  configureMQTT,
};