import mqtt from 'mqtt';
import { mqttConfig } from '../config/mqtt.js';

class MQTTClient {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  // Connect to the MQTT broker
  connect() {
    this.client = mqtt.connect(mqttConfig.brokerUrl, {
      clientId: mqttConfig.clientId,
      username: mqttConfig.username,
      password: mqttConfig.password,
    });

    this.client.on('connect', () => {
      console.log('MQTT Client Connected');
      this.isConnected = true;
      // Subscribe to topics
      this.client.subscribe(mqttConfig.topics, (err) => {
        if (!err) {
          console.log('MQTT Client Subscribed to topics');
        }
      });
    });

    this.client.on('message', (topic, message) => {
      // message is a buffer
      const payload = message.toString();
      console.log(`Message received on topic ${topic}: ${payload}`);
      // Handle message
      this.handleMessage(topic, payload);
    });

    this.client.on('error', (error) => {
      console.error('MQTT Client Error:', error);
      this.isConnected = false;
    });

    this.client.on('close', () => {
      console.log('MQTT Client Disconnected');
      this.isConnected = false;
    });
  }

  // Handle incoming messages
  handleMessage(topic, payload) {
    // Parse the payload as JSON
    try {
      const data = JSON.parse(payload);
      // TODO: Implement logic to handle the data based on the topic
      // This could involve updating the state, storing the data, etc.
    } catch (error) {
      console.error('Error handling MQTT message:', error);
    }
  }

  // Send a message to a topic
  sendMessage(topic, message) {
    if (this.isConnected) {
      this.client.publish(topic, JSON.stringify(message), (err) => {
        if (err) {
          console.error('Error sending MQTT message:', err);
        } else {
          console.log(`Message sent to topic ${topic}`);
        }
      });
    } else {
      console.error('MQTT Client is not connected. Message not sent.');
    }
  }

  // Disconnect from the MQTT broker
  disconnect() {
    if (this.client) {
      this.client.end(() => {
        console.log('MQTT Client Disconnected');
        this.isConnected = false;
      });
    }
  }
}

// Export an instance of the MQTTClient
const mqttClient = new MQTTClient();
export default mqttClient;