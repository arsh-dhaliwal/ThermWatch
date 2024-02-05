import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import PlantContextProvider from './context/PlantContext';
import AssetContextProvider from './context/AssetContext';
import SensorContextProvider from './context/SensorContext';

// Main entry point for the ThermWatch web application.
// Wraps the entire application with necessary context providers for state management
// and sets up routing with BrowserRouter from react-router-dom.

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PlantContextProvider>
          <AssetContextProvider>
            <SensorContextProvider>
              <App />
            </SensorContextProvider>
          </AssetContextProvider>
        </PlantContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// Service worker registration for PWA capabilities can be added here if needed.
// Uncomment the following lines to register a service worker.

// import * as serviceWorker from './serviceWorker';
// serviceWorker.register();

// Note: This file sets up the React application with context providers that will manage the state
// for authentication, plants, assets, and sensors. It also wraps the App component with BrowserRouter
// for routing capabilities. The index.css file is imported to apply global styles.