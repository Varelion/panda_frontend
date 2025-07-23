// React core library for building user interfaces
import React, { useState } from 'react';
// Header component that provides the site navigation and branding
import Header from '../shared/components/layout/Header';

/**
 * FeedbackPage Component
 * 
 * This component renders a comprehensive feedback form for the Pandren Express service.
 * It allows users to submit detailed feedback about their experience, which gets sent
 * to a Discord webhook for the guild to review. The form includes rating system,
 * categorization, and detailed feedback collection.
 * 
 * Features:
 * - 5-star rating system with visual feedback
 * - Multiple feedback categories (food, delivery, RP experience, etc.)
 * - Discord webhook integration for submissions
 * - Form validation and error handling
 * - Success/error status messaging
 * - Responsive design for mobile and desktop
 */
function FeedbackPage() {
  // Main form data state - contains all user input fields
  // Default values are set to provide good starting points for users
  const [formData, setFormData] = useState({
    characterName: '',          // Required: WoW character name
    email: '',                  // Optional: Contact email for follow-up
    server: 'Moon Guard',       // Default to primary RP server
    orderNumber: '',            // Optional: Reference number for specific orders
    rating: '5',                // Default to highest rating (optimistic default)
    category: 'general',        // Default feedback category
    title: '',                  // Required: Brief summary of feedback
    feedback: '',               // Required: Detailed feedback content
    wouldRecommend: 'yes'       // Default to positive recommendation
  });
  
  // Loading state to prevent double submissions and show loading UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Status tracking for form submission (null, 'success', or 'error')
  // Used to display appropriate feedback messages to the user
  const [submitStatus, setSubmitStatus] = useState(null);

  /**
   * Form submission handler
   * 
   * Processes the feedback form submission by:
   * 1. Preventing default form submission behavior
   * 2. Setting loading state and clearing previous status
   * 3. Building a Discord embed with all form data
   * 4. Sending the data to Discord webhook
   * 5. Handling success/error responses
   * 6. Resetting form on successful submission
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();           // Prevent default browser form submission
    setIsSubmitting(true);        // Show loading state to user
    setSubmitStatus(null);        // Clear any previous submission status

    try {
      // Get Discord webhook URL from environment variables
      // Falls back to placeholder if not configured (for development)
      const webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_URL || 'YOUR_DISCORD_WEBHOOK_URL';

      // Rating system mappings - converting numeric ratings to descriptive text
      // Removed emoji usage and replaced with text-only descriptions
      const ratingText = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];
      const ratingLabel = ratingText[parseInt(formData.rating) - 1];

      // Discord embed object - structures the feedback data for rich display in Discord
      // Color coding: Green (4-5 stars), Yellow (3 stars), Red (1-2 stars)
      const embed = {
        title: "New Feedback Submission - Pandren Express",
        color: formData.rating >= '4' ? 0x00ff00 : formData.rating >= '3' ? 0xffff00 : 0xff0000,
        fields: [
          // Customer identification fields (displayed inline for compact layout)
          {
            name: "Character Name",
            value: formData.characterName,
            inline: true
          },
          {
            name: "Email",
            value: formData.email || "Not provided",
            inline: true
          },
          {
            name: "Server",
            value: formData.server,
            inline: true
          },
          // Order reference and rating information
          {
            name: "Order Number",
            value: formData.orderNumber || "Not provided",
            inline: true
          },
          {
            name: "Rating",
            value: `${formData.rating}/5 - ${ratingLabel}`,
            inline: true
          },
          {
            name: "Category",
            value: formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
            inline: true
          },
          {
            name: "Would Recommend",
            value: formData.wouldRecommend === 'yes' ? 'Yes' : 'No',
            inline: true
          },
          // Main feedback content (full width for better readability)
          {
            name: "Feedback Title",
            value: formData.title,
            inline: false
          },
          {
            name: "Detailed Feedback",
            value: formData.feedback,
            inline: false
          }
        ],
        footer: {
          text: "Pandren Express Feedback • Helping us serve you better!"
        },
        timestamp: new Date().toISOString()    // Timestamp for when feedback was submitted
      };

      // Send the feedback to Discord webhook using HTTP POST request
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "Pandren Express Feedback",                    // Display name for the webhook
          avatar_url: "https://example.com/panda-avatar.png",      // Webhook avatar (replace with actual URL)
          embeds: [embed]                                          // Discord embed containing formatted feedback
        }),
      });

      // Handle successful submission
      if (response.ok) {
        setSubmitStatus('success');
        // Reset form to initial state after successful submission
        setFormData({
          characterName: '',
          email: '',
          server: 'Moon Guard',
          orderNumber: '',
          rating: '5',
          category: 'general',
          title: '',
          feedback: '',
          wouldRecommend: 'yes'
        });
      } else {
        // HTTP error response (4xx, 5xx status codes)
        setSubmitStatus('error');
      }
    } catch (error) {
      // Network errors, JSON parsing errors, or other runtime errors
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      // Always reset loading state, regardless of success or failure
      setIsSubmitting(false);
    }
  };

  /**
   * Get rating display text based on numeric rating
   * 
   * Converts numeric rating (1-5) to descriptive text for UI display.
   * Replaces the previous emoji-based system with accessible text descriptions.
   * 
   * @param {string} rating - Numeric rating from 1-5
   * @returns {string} Descriptive text for the rating
   */
  const getRatingText = (rating) => {
    const ratingDescriptions = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];
    return ratingDescriptions[parseInt(rating) - 1] || 'Good';
  };

  /**
   * Get CSS color class based on numeric rating
   * 
   * Provides visual feedback through color coding:
   * - Green (4-5): Positive ratings
   * - Yellow (3): Neutral rating  
   * - Red (1-2): Negative ratings
   * 
   * @param {string} rating - Numeric rating from 1-5
   * @returns {string} Tailwind CSS color class
   */
  const getRatingColor = (rating) => {
    if (rating >= '4') return 'text-green-600';
    if (rating >= '3') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen themed-bg">
      {/* Site header with navigation */}
      <Header />
      
      {/* Main page content */}
      <main className="pt-8">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Page header section - introduces the feedback form purpose */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              <span className="text-[#d1282e]">Share Your Adventure!</span>
            </h1>
            <p className="text-xl text-purple-600 font-bold mb-4">
              Help Us Improve Your Pandren Express Experience!
            </p>
            <p className="text-lg themed-text max-w-3xl mx-auto leading-relaxed">
              Your feedback helps us serve the <span className="text-blue-600 font-bold">Moon Guard community</span> better!
              Whether it's praise for our <span className="text-green-600 font-bold">amazing food</span>,
              suggestions for improvement, or ideas for new <span className="text-purple-600 font-bold">RP experiences</span>,
              we want to hear from you!
            </p>
          </div>

          {/* Main feedback form container */}
          <div className="themed-card p-8 mb-16">
            <h2 className="text-3xl font-bold text-center themed-text-heavy mb-8">
              <span className="text-blue-600">Tell Us About Your Experience</span>
            </h2>

            {/* Success message - displayed after successful form submission */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
                <div>
                  <h3 className="font-bold text-lg">Thank You for Your Feedback!</h3>
                  <p>Your feedback has been sent to our guild Discord! We read every single review and use them to make Pandren Express even better!</p>
                </div>
              </div>
            )}

            {/* Error message - displayed when submission fails */}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
                <div>
                  <h3 className="font-bold text-lg">Oops! Something Went Wrong</h3>
                  <p>Your feedback couldn't be submitted. Please try again or reach out to us on Discord.</p>
                </div>
              </div>
            )}

            {/* Main feedback form with onSubmit handler */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Information Section - Character and contact details */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Character Name - Required field for WoW character identification */}
                <div>
                  <label className="block text-sm font-medium themed-text-heavy mb-2">
                    Character Name *
                  </label>
                  <input
                    type="text"
                    value={formData.characterName}
                    onChange={(e) => setFormData({ ...formData, characterName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                    placeholder="Your WoW character name"
                    required
                  />
                </div>

                {/* Email - Optional field for follow-up contact */}
                <div>
                  <label className="block text-sm font-medium themed-text-heavy mb-2">
                    Email <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Server and Order Information Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Server Selection - Dropdown for WoW server identification */}
                <div>
                  <label className="block text-sm font-medium themed-text-heavy mb-2">
                    Server
                  </label>
                  <select
                    value={formData.server}
                    onChange={(e) => setFormData({ ...formData, server: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                  >
                    <option value="Moon Guard">Moon Guard</option>
                    <option value="Wyrmrest Accord">Wyrmrest Accord</option>
                    <option value="Other">Other Server</option>
                  </select>
                </div>

                {/* Order Number - Optional reference for specific order feedback */}
                <div>
                  <label className="block text-sm font-medium themed-text-heavy mb-2">
                    Order Number <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                    placeholder="#PE001234"
                  />
                </div>
              </div>

              {/* Rating Section - 1-5 star rating system with visual feedback */}
              <div>
                <label className="block text-sm font-medium themed-text-heavy mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-4">
                  {/* Range slider input for rating selection */}
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  {/* Text display of current rating description (replaces emoji) */}
                  <div className={`text-lg font-bold ${getRatingColor(formData.rating)}`}>
                    {getRatingText(formData.rating)}
                  </div>
                  {/* Numeric rating display */}
                  <div className={`text-xl font-bold ${getRatingColor(formData.rating)}`}>
                    {formData.rating}/5
                  </div>
                </div>
                {/* Rating scale labels beneath the slider */}
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Terrible</span>
                  <span>Poor</span>
                  <span>Average</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Category and Recommendation Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Feedback Category - Helps organize feedback by topic */}
                <div>
                  <label className="block text-sm font-medium themed-text-heavy mb-2">
                    Feedback Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                    required
                  >
                    <option value="general">General Experience</option>
                    <option value="food">Food Quality</option>
                    <option value="delivery">Delivery Service</option>
                    <option value="rp">RP Experience</option>
                    <option value="staff">Staff/Guild Members</option>
                    <option value="website">Website/Ordering</option>
                    <option value="suggestion">Suggestion/Idea</option>
                  </select>
                </div>

                {/* Recommendation Question - Net Promoter Score-style question */}
                <div>
                  <label className="block text-sm font-medium themed-text-heavy mb-2">
                    Would you recommend us to other guild members? *
                  </label>
                  <select
                    value={formData.wouldRecommend}
                    onChange={(e) => setFormData({ ...formData, wouldRecommend: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                    required
                  >
                    <option value="yes">Absolutely!</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              {/* Feedback Content Section - Main feedback text fields */}
              
              {/* Feedback Title - Brief summary input */}
              <div>
                <label className="block text-sm font-medium themed-text-heavy mb-2">
                  Feedback Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Brief summary of your feedback"
                  required
                />
              </div>

              {/* Detailed Feedback - Main textarea for comprehensive feedback */}
              <div>
                <label className="block text-sm font-medium themed-text-heavy mb-2">
                  Detailed Feedback *
                </label>
                <textarea
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all resize-vertical"
                  placeholder="Tell us about your experience! What did you love? What could we improve? Any suggestions for making the RP experience even better?"
                  required
                />
              </div>

              {/* Submit Button - Shows loading state during submission */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFC72C] text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
              </button>
            </form>
          </div>

          {/* 
            Commented out sections for potential future features:
            - How We Use Your Feedback: Section explaining feedback utilization
            - Community Recognition: Section about feedback contributor rewards
            These sections are currently disabled but preserved for future implementation
          */}

          {/* Community Statistics Section - Shows feedback impact metrics */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-16">
            <h3 className="text-2xl font-bold text-center mb-6">Community Feedback Impact</h3>
            {/* Statistics grid - displays key metrics in responsive layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Average Rating Metric */}
              <div className="text-center">
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-sm">Average Rating</div>
              </div>
              {/* Total Reviews Metric */}
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Reviews Collected</div>
              </div>
              {/* Improvements Made Metric */}
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Improvements Made</div>
              </div>
              {/* Recommendation Rate Metric */}
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Export the FeedbackPage component as the default export for use in routing
export default FeedbackPage;
