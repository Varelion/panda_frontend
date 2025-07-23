import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

import Header from '../shared/components/layout/Header';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    characterName: '',
    email: '',
    server: 'Moon Guard',
    subject: '',
    message: '',
    contactType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Discord webhook URL - replace with actual webhook URL
      const webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_URL || 'YOUR_DISCORD_WEBHOOK_URL';

      const embed = {
        title: 'New Contact Form Submission - Pandren Express',
        color: 0xd1282e,
        fields: [
          {
            name: 'Character Name',
            value: formData.characterName,
            inline: true,
          },
          {
            name: 'Email',
            value: formData.email || 'Not provided',
            inline: true,
          },
          {
            name: 'Server',
            value: formData.server,
            inline: true,
          },
          {
            name: 'Contact Type',
            value: formData.contactType.charAt(0).toUpperCase() + formData.contactType.slice(1),
            inline: true,
          },
          {
            name: 'Subject',
            value: formData.subject,
            inline: false,
          },
          {
            name: 'Message',
            value: formData.message,
            inline: false,
          },
        ],
        footer: {
          text: 'Pandren Express Contact Form • For the Horde and Alliance!',
        },
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'Pandren Express Contact',
          avatar_url: 'https://example.com/panda-avatar.png', // Replace with actual avatar URL
          embeds: [embed],
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          characterName: '',
          email: '',
          server: 'Moon Guard',
          subject: '',
          message: '',
          contactType: 'general',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              <span className="text-[#d1282e]">Contact Our Guild</span>
            </h1>
            <p className="text-xl text-purple-600 font-bold mb-4">
              Reach Out to the Pandren Express Family!
            </p>
            <p className="text-lg themed-text max-w-3xl mx-auto leading-relaxed">
              Whether you need help with your <span className="text-blue-600 font-bold">order</span>
              , have questions about our <span className="text-green-600 font-bold">services</span>,
              or want to join our{' '}
              <span className="text-purple-600 font-bold">amazing community</span>, we're here to
              help make your <span className="text-yellow-600 font-bold">culinary adventure</span>{' '}
              perfect!
            </p>
          </div>

          {/* Contact Form */}
          <div className="themed-card p-8 mb-16">
            <h2 className="text-3xl font-bold text-center themed-text-heavy mb-8">
              <span className="text-blue-600">Send Us a Message</span>
            </h2>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
                <div>
                  <h3 className="font-bold text-lg">Message Sent Successfully!</h3>
                  <p>
                    Your message has been delivered to our guild Discord! We'll get back to you
                    faster than a rogue's vanish.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
                <div>
                  <h3 className="font-bold text-lg">Oops! Something Went Wrong</h3>
                  <p>
                    Your message couldn't be sent. Please try again or contact us directly on
                    Discord.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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

              <div>
                <Tooltip id="serverSelect" content="Moon Guard only for now, sorry!" float={true} />
                <div data-tooltip-id="serverSelect">
                  <label className="block text-sm font-medium themed-text-heavy mb-2">Server</label>
                  <select
                    value={formData.server}
                    onChange={(e) => setFormData({ ...formData, server: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all disabled:"
                    disabled
                  >
                    <option value="Moon Guard">Moon Guard (Primary)</option>
                    <option value="Wyrmrest Accord">Wyrmrest Accord</option>
                    <option value="Other">Other Server</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium themed-text-heavy mb-2">
                  What can we help you with?
                </label>
                <select
                  value={formData.contactType}
                  onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                  required
                >
                  <option value="general">General Question</option>
                  <option value="order">Order Support</option>
                  <option value="delivery">Delivery Issue</option>
                  <option value="guild">Guild/Community</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership/Business</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium themed-text-heavy mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Brief summary of your message"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium themed-text-heavy mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all resize-vertical"
                  placeholder="Tell us more about how we can help you! Include any relevant order numbers, character names, or details."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFC72C] text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message to Guild'}
              </button>
            </form>
          </div>

          {/* Alternative Contact Methods */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="themed-card p-8">
              <h3 className="text-2xl font-bold text-purple-600 mb-6 text-center">
                Discord Community
              </h3>
              <div className="text-center">
                <p className="themed-text text-lg leading-relaxed mb-6">
                  Join our <span className="text-blue-600 font-bold">Discord server</span> for
                  <span className="text-green-600 font-bold"> real-time chat</span>,
                  <span className="text-purple-600 font-bold">community events</span>, and
                  <span className="text-yellow-600 font-bold">instant support!</span>
                </p>
                <a
                  href="#"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors inline-block"
                >
                  Join Our Discord
                </a>
              </div>
            </div>

            <div className="themed-card p-8">
              <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">
                In-Game Contact
              </h3>
              <div className="text-center">
                <p className="themed-text text-lg leading-relaxed mb-6">
                  Find our <span className="text-blue-600 font-bold">guild representatives</span> in
                  <span className="text-purple-600 font-bold">Stormwind City</span> or
                  <span className="text-green-600 font-bold">Orgrimmar</span> for
                  <span className="text-yellow-600 font-bold">immediate assistance!</span>
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 font-bold">
                    Look for: <span className="text-[#d1282e]">[Pandren Express]</span> guild tag
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ContactUsPage;
