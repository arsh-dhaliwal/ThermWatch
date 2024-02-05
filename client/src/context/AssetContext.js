import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../utils/api';

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const response = await api.get('/api/assets', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAssets(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching assets', error);
        }
      }
    };

    fetchAssets();
  }, [isAuthenticated, getAccessTokenSilently]);

  const selectAsset = (assetId) => {
    const asset = assets.find((a) => a._id === assetId);
    setSelectedAsset(asset);
  };

  const updateAsset = async (assetId, updatedData) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await api.put(`/api/assets/${assetId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssets(assets.map((asset) => (asset._id === assetId ? response.data : asset)));
      setSelectedAsset(response.data);
    } catch (error) {
      console.error('Error updating asset', error);
    }
  };

  return (
    <AssetContext.Provider
      value={{
        assets,
        selectedAsset,
        loading,
        selectAsset,
        updateAsset,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};