// LocationPage component - displays restaurant location information
// React library for creating the component
import React from 'react';
// Header component for consistent navigation across pages
import Header from '../shared/components/layout/Header';

/**
 * LocationPage Component - Restaurant location finder
 * 
 * Displays restaurant location information including:
 * - Current/featured location with address and hours
 * - Store locator tools (map, hours, directions)
 * - Popular nearby locations with details
 * - Contact information and location change options
 * 
 * Features:
 * - Responsive grid layout for location cards
 * - Interactive buttons for ordering and directions
 * - Status indicators for open/closed locations
 * - Integration with store locator and mapping services
 */
function LocationPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero section with page title and description */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Find Your Panda
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              Locate the nearest Panda Express restaurant, check hours, and get directions.
            </p>
          </div>

          {/* Featured location section - highlights the primary/current restaurant */}
          <div className="bg-[#d1282e] text-white p-8 rounded-lg mb-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Current Location</h2>
              {/* Location details card with address, hours, and contact info */}
              <div className="themed-card bg-white text-black p-6 rounded-lg max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-2">Central Park & Carl D Silver</h3>
                <p className="text-gray-600 mb-4">
                  1234 Central Park Ave<br />
                  New York, NY 10025
                </p>
                {/* Quick info display with hours and phone */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Today:</span>
                    <span className="font-bold text-green-600">Open 10:30 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>(212) 555-0123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service tools grid - three main location services */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Store Locator tool card */}
            <div className="themed-card p-6 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">📍</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Store Locator</h3>
              <p className="themed-text mb-4">
                Find Panda Express locations near you with our interactive map and search tools.
              </p>
              <a 
                href="#" 
                className="bg-[#d1282e] text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition-colors inline-block"
              >
                Find Locations
              </a>
            </div>

            {/* Store Hours tool card */}
            <div className="themed-card p-6 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">🕒</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Store Hours</h3>
              <p className="themed-text mb-4">
                Check current hours, holiday schedules, and temporary closures for any location.
              </p>
              <a 
                href="#" 
                className="bg-[#d1282e] text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition-colors inline-block"
              >
                View Hours
              </a>
            </div>

            {/* Directions tool card */}
            <div className="themed-card p-6 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">🚗</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Get Directions</h3>
              <p className="themed-text mb-4">
                Get turn-by-turn directions to your nearest Panda Express location.
              </p>
              <a 
                href="#" 
                className="bg-[#d1282e] text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition-colors inline-block"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Popular locations section - displays nearby restaurant options */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold themed-text-heavy text-center mb-8">Popular Nearby Locations</h2>
            {/* Responsive grid of location cards with details and action buttons */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Times Square location card */}
              <div className="themed-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold themed-text-heavy">Times Square</h3>
                    <p className="themed-text">1568 Broadway, New York, NY 10036</p>
                  </div>
                  {/* Status indicator showing current open/closed state */}
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">Open</span>
                </div>
                {/* Location details: distance, hours, contact */}
                <div className="space-y-2 text-sm themed-text">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span>2.3 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span>10:30 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>(212) 555-0456</span>
                  </div>
                </div>
                {/* Action buttons for ordering and navigation */}
                <div className="mt-4 space-x-2">
                  <a href="#" className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm hover:bg-yellow-300 transition-colors">
                    Order Now
                  </a>
                  <a href="#" className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-bold text-sm hover:bg-gray-300 transition-colors">
                    Directions
                  </a>
                </div>
              </div>

              <div className="themed-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold themed-text-heavy">Union Square</h3>
                    <p className="themed-text">45 E 14th St, New York, NY 10003</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">Open</span>
                </div>
                <div className="space-y-2 text-sm themed-text">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span>1.8 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span>10:30 AM - 10:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>(212) 555-0789</span>
                  </div>
                </div>
                <div className="mt-4 space-x-2">
                  <a href="#" className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm hover:bg-yellow-300 transition-colors">
                    Order Now
                  </a>
                  <a href="#" className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-bold text-sm hover:bg-gray-300 transition-colors">
                    Directions
                  </a>
                </div>
              </div>

              <div className="themed-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold themed-text-heavy">Columbus Circle</h3>
                    <p className="themed-text">10 Columbus Cir, New York, NY 10019</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">Open</span>
                </div>
                <div className="space-y-2 text-sm themed-text">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span>0.9 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span>10:30 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>(212) 555-0321</span>
                  </div>
                </div>
                <div className="mt-4 space-x-2">
                  <a href="#" className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm hover:bg-yellow-300 transition-colors">
                    Order Now
                  </a>
                  <a href="#" className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-bold text-sm hover:bg-gray-300 transition-colors">
                    Directions
                  </a>
                </div>
              </div>

              <div className="themed-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold themed-text-heavy">Grand Central</h3>
                    <p className="themed-text">89 E 42nd St, New York, NY 10017</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">Open</span>
                </div>
                <div className="space-y-2 text-sm themed-text">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span>3.1 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span>10:30 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>(212) 555-0654</span>
                  </div>
                </div>
                <div className="mt-4 space-x-2">
                  <a href="#" className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm hover:bg-yellow-300 transition-colors">
                    Order Now
                  </a>
                  <a href="#" className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-bold text-sm hover:bg-gray-300 transition-colors">
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold themed-text-heavy mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-lg themed-text mb-8 max-w-3xl mx-auto">
              Use our store locator to find the perfect Panda Express location for you, or contact us for assistance.
            </p>
            <div className="space-x-4">
              <a 
                href="#" 
                className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block"
              >
                Full Store Locator
              </a>
              <a 
                href="#" 
                className="bg-[#d1282e] text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-600 transition-colors inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="bg-yellow-50 p-8 rounded-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Need to Change Your Location?</h3>
              <p className="themed-text mb-6">
                Update your preferred store to see accurate hours, menu availability, and order for pickup.
              </p>
              <a 
                href="#" 
                className="bg-[#d1282e] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors inline-block"
              >
                Change Location
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LocationPage;