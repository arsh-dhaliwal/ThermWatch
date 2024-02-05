# ThermWatch

ThermWatch is a comprehensive web application designed for monitoring the temperature of high-value assets located inside plants. It provides plant operators with real-time temperature data and trend analysis tools to better plan plant operations. The application supports multiple plants and assets, each with a range of sensors for detailed temperature monitoring.

## Features

- Secure user authentication using Auth0.
- Multi-level data models including User, Company, Plant, Asset, and Sensor profiles.
- Real-time temperature data monitoring with configurable sample rates.
- Daily temperature calculations for maximum, minimum, and average readings.
- Alert and alarm system with configurable thresholds and color-coded status indicators.
- Integration with PLC or PFC from Wago using Modbus and/or MQTT protocols.
- Comprehensive settings for company, plant, asset, and sensor configurations.
- Intuitive setup wizard for initial configuration and a demo mode with mock data.
- Responsive, modern, and aesthetically pleasing dark-themed UI with blue accents.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the root directory and install server dependencies:
   ```
   npm install
   ```
3. Navigate to the `client` directory and install client dependencies:
   ```
   cd client
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   DB_URI=<your_mongodb_uri>
   AUTH0_DOMAIN=<your_auth0_domain>
   AUTH0_CLIENT_ID=<your_auth0_client_id>
   AUTH0_CLIENT_SECRET=<your_auth0_client_secret>
   ```
5. Start the server from the root directory:
   ```
   npm start
   ```
6. In a separate terminal, start the client from the `client` directory:
   ```
   npm start
   ```
7. Access the application through `http://localhost:3000` in your web browser.

## Adding a Logo

To add your company logo to ThermWatch:

1. Place your logo image file in the `client/public` directory.
2. Reference the logo in the appropriate components by updating the `src` attribute to the path of your logo file.

## Application Structure

- `server.js`: Entry point for the Node.js server.
- `app.js`: Main application setup with middleware and routes.
- `config/`: Configuration files for the database, authentication, and communication protocols.
- `models/`: Mongoose schemas for the application data models.
- `routes/api/`: API route definitions for handling HTTP requests.
- `controllers/`: Controller functions for API logic.
- `client/`: React frontend application with components, utilities, and styles.
- `client/src/components/`: React components for each page and feature.
- `client/src/utils/`: Utility functions for authentication and communication with the backend.
- `client/src/hooks/`: Custom React hooks for data fetching and state management.
- `client/src/context/`: React context providers for global state management.
- `client/src/styles/`: CSS files for styling the application.

## Contributing

To contribute to ThermWatch, please follow the commenting guidelines provided in the codebase to maintain clarity and consistency. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

Please note that this README is a brief overview of the ThermWatch application. For detailed documentation on each component and functionality, refer to the comments within the codebase.