// --------------------------
//#region src/App.jsx
// --------------------------

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Signup, ProtectedRoute } from './features/auth';
import { Dashboard } from './features/dashboard';
import HomePage from './pages/HomePage';
import { 
  OurFoodPhilosophyPage,
  OurFamilyPage,
  OurStaffPage,
  UnityPage,
  GiftCardsPage,
  OurValuesPage,
  OurFoodPage,
  OurShopPage,
  RewardsPage,
  LocationPage,
  AboutPage,
  ContactUsPage,
  FeedbackPage,
  MaintenancePage
} from './pages';
import { AdminLogin, AdminDashboard } from './features/admin';
import SiteStatusWrapper from './shared/components/SiteStatusWrapper';

function App() {
  return (
    <Router>
      <div className="min-h-screen themed-bg">
        <SiteStatusWrapper>
          <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dropdown menu routes */}
          <Route path="/our-food-philosophy" element={<OurFoodPhilosophyPage />} />
          <Route path="/our-family" element={<OurFamilyPage />} />
          <Route path="/our-staff" element={<OurStaffPage />} />
          <Route path="/unity" element={<UnityPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/our-values" element={<OurValuesPage />} />
          <Route path="/our-food" element={<OurFoodPage />} />
          <Route path="/our-shop" element={<OurShopPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/location" element={<LocationPage />} />
          
          {/* About section routes */}
          <Route path="/About" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/Feedback" element={<FeedbackPage />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SiteStatusWrapper>
      </div>
    </Router>
  );
}

export default App;

// --------------------------
//#endregion src/App.jsx
// --------------------------
