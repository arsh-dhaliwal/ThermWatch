import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import PlantPage from './components/PlantPage';
import AssetDashboard from './components/AssetDashboard';
import SetupWizard from './components/SetupWizard';
import AuthContext from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import './styles/index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: Implement logic to check if user is authenticated
    // setIsAuthenticated(true/false);
    // setUser(userData);
  }, []);

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <AuthContext.Provider value={{ isAuthenticated, user }}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/plants" component={PlantPage} />
            <PrivateRoute path="/assets/:plantId" component={AssetDashboard} />
            <Route path="/setup" component={SetupWizard} />
            <Route path="/" exact component={Login} />
            {/* Redirect all other paths to login for now */}
            <Route path="*" component={Login} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </Auth0Provider>
  );
};

export default App;