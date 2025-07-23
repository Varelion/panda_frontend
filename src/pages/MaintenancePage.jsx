// MaintenancePage component - displays service unavailable message
// React library for creating the component
import React from 'react';

/**
 * MaintenancePage Component - Service unavailable page
 * 
 * Displays a maintenance message when the delivery service is offline.
 * Provides a Discord link for users to stay connected and get updates.
 * 
 * Features:
 * - Friendly maintenance message with panda theme
 * - Discord invitation link for community updates
 * - Responsive design for mobile and desktop
 * - Environment variable support for Discord URL configuration
 */
function MaintenancePage() {
  // Discord invite URL from environment variables with fallback
  // This allows different Discord servers for different environments (dev/staging/prod)
  const discordInviteUrl = import.meta.env.VITE_DISCORD_INVITE_URL || 'https://discord.gg/cXRfjVZ7XK';

  return (
    <div className="min-h-screen themed-bg flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="themed-card p-12">
          {/* Large panda icon to maintain theme consistency */}
          <div className="text-8xl mb-8">
            🐼
          </div>
          
          {/* Primary heading explaining the service status */}
          <h1 className="text-4xl md:text-5xl font-bold themed-text-heavy mb-6">
            <span className="text-[#d1282e]">Service Temporarily Unavailable</span>
          </h1>
          
          {/* Secondary message explaining why service is unavailable */}
          <p className="text-2xl text-gray-600 font-bold mb-8">
            No delivery personnel online. Please try again later!
          </p>
          
          {/* Friendly explanation with community reference */}
          <p className="text-lg themed-text mb-8 leading-relaxed">
            Our delivery pandas are currently taking a well-deserved break! 
            We'll be back to serving the <span className="text-blue-600 font-bold">Moon Guard community</span> soon.
          </p>
          
          {/* Discord invitation section for community engagement */}
          <div className="mb-8">
            <h2 className="text-xl font-bold themed-text-heavy mb-4">
              Stay Connected with Our Guild!
            </h2>
            {/* Discord link with official Discord branding colors */}
            <a
              href={discordInviteUrl}
              target="_blank"  // Opens in new tab
              rel="noopener noreferrer"  // Security attributes for external links
              className="bg-[#5865F2] text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-[#4752C4] transition-colors inline-block shadow-lg"
            >
              Join Our Discord
            </a>
          </div>
          
          {/* Additional information about getting updates */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold">Check our Discord</span> for real-time updates on when 
              service will resume. Our guild members will post announcements as soon as 
              our delivery pandas are ready to roll!
            </p>
          </div>
          
          {/* Themed flavor text to maintain brand personality */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              "Even the mightiest pandas need their bamboo breaks!" 
              <br />
              - Ancient Pandaren Wisdom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;