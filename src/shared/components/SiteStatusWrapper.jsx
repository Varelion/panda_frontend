import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteStatus } from '../hooks/useSiteStatus';
import { MaintenancePage } from '../../pages';
import LoadingBar from './ui/LoadingBar';

function SiteStatusWrapper({ children }) {
  const { siteStatus, isLoading } = useSiteStatus();
  const location = useLocation();
  
  // Allow admin routes even when site is closed
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Show loading bar while checking site status, but still render content underneath
  if (isLoading) {
    return (
      <>
        <LoadingBar isLoading={true} />
        {children}
      </>
    );
  }
  
  // If site is closed and not an admin route, show maintenance page
  if (siteStatus === 'closed' && !isAdminRoute) {
    return <MaintenancePage />;
  }
  
  // Otherwise show the normal content
  return children;
}

export default SiteStatusWrapper;