import React from 'react';
import Header from '../shared/components/layout/Header';

function GiftCardsPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Gift Cards
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              Share the joy of Panda Express with friends and family. Perfect for any occasion!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="themed-card p-8">
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">Physical Gift Cards</h2>
              <p className="themed-text mb-6">
                Beautiful physical gift cards available at any Panda Express location. 
                Perfect for birthdays, holidays, or just because!
              </p>
              <div className="bg-gradient-to-r from-[#d1282e] to-red-600 p-6 rounded-lg text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🐼</div>
                  <div className="text-lg font-bold">Panda Express</div>
                  <div className="text-sm opacity-90">Gift Card</div>
                </div>
              </div>
            </div>

            <div className="themed-card p-8">
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">Digital Gift Cards</h2>
              <p className="themed-text mb-6">
                Instant delivery via email. Perfect for last-minute gifts or sending love from afar.
              </p>
              <div className="bg-yellow-400 p-6 rounded-lg text-black">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🎁</div>
                  <div className="text-lg font-bold">Digital Gift Card</div>
                  <div className="text-sm">Delivered instantly</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold themed-text-heavy mb-8">Choose Your Amount</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {['$10', '$25', '$50', '$100'].map((amount) => (
                <div key={amount} className="themed-card p-6 text-center cursor-pointer hover:bg-yellow-50 transition-colors">
                  <div className="text-2xl font-bold themed-text-heavy">{amount}</div>
                </div>
              ))}
            </div>
            <p className="themed-text mt-4">Or choose any custom amount between $5 - $500</p>
          </div>

          <div className="bg-[#d1282e] text-white p-12 rounded-lg mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Gift Card Benefits</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-2">No Expiration</h3>
                  <p>Our gift cards never expire, so your recipient can enjoy Panda Express whenever they want.</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-bold mb-2">Use Anywhere</h3>
                  <p>Valid at all Panda Express locations nationwide and online ordering.</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-bold mb-2">Check Balance</h3>
                  <p>Easy balance checking online or at any location.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">Perfect For</h2>
              <ul className="space-y-3">
                {[
                  'Birthdays and celebrations',
                  'Employee appreciation',
                  'Holiday gifts',
                  'Student care packages',
                  'Thank you gestures',
                  'Just because moments'
                ].map((occasion, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm">✓</span>
                    </div>
                    <span className="themed-text">{occasion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">How to Use</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#d1282e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold themed-text-heavy">Purchase</h4>
                    <p className="themed-text">Buy online or at any location</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#d1282e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold themed-text-heavy">Give</h4>
                    <p className="themed-text">Share with your loved one</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#d1282e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold themed-text-heavy">Enjoy</h4>
                    <p className="themed-text">Use at any Panda Express location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="#" 
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block mr-4"
            >
              Buy Gift Card
            </a>
            <a 
              href="#" 
              className="bg-[#d1282e] text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-600 transition-colors inline-block"
            >
              Check Balance
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GiftCardsPage;