import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import createAuth0Client from '@auth0/auth0-spa-js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth0Client, setAuth0Client] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0 = await createAuth0Client({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      setAuth0Client(auth0);

      if (window.location.search.includes('code=')) {
        await auth0.handleRedirectCallback();
        history.replace(window.location.pathname);
      }

      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }

      setIsLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginWithRedirect = async () => {
    await auth0Client.loginWithRedirect();
  };

  const logout = () => {
    auth0Client.logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth0Client,
        isLoading,
        isAuthenticated,
        user,
        loginWithRedirect,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};