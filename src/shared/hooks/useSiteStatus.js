import { useState, useEffect } from 'react';

export const useSiteStatus = () => {
  const [siteStatus, setSiteStatus] = useState('open');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSiteStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/site-status');
        if (response.ok) {
          const data = await response.json();
          setSiteStatus(data.status);
        } else {
          // If we can't reach the backend, assume site is open
          setSiteStatus('open');
        }
      } catch (error) {
        console.error('Error checking site status:', error);
        // If there's a network error, assume site is open
        setSiteStatus('open');
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkSiteStatus();
    
    // Check site status every 30 seconds
    const interval = setInterval(checkSiteStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { siteStatus, isLoading, error };
};