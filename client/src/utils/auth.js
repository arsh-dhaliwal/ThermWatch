import { createContext, useContext, useState, useEffect } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [auth0Client, setAuth0Client] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0 = await createAuth0Client(initOptions);
      setAuth0Client(auth0);

      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        const { appState } = await auth0.handleRedirectCallback();
        onRedirectCallback(appState);
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
    // eslint-disable-next-line
  }, []);

  const loginWithRedirect = async (params = {}) => {
    await auth0Client.loginWithRedirect(params);
  };

  const getTokenSilently = async (params = {}) => {
    return await auth0Client.getTokenSilently(params);
  };

  const logout = () => {
    auth0Client.logout({
      returnTo: window.location.origin
    });
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        loginWithRedirect,
        getTokenSilently,
        logout
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};