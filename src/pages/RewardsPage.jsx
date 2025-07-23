import React from 'react';
import Header from '../shared/components/layout/Header';

function RewardsPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Pandaren Rewards
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              Every order gives you a chance to earn a special token! Collect tokens to unlock the power of custom orders and exclusive experiences.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#d1282e] to-red-600 text-white p-12 rounded-lg mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">The Secret Token System</h2>
            <p className="text-lg mb-8 max-w-4xl mx-auto">
              With every order, you have a chance to receive a mysterious token. Our reward method is our secret!
              Each token unlocks the ultimate dining experience - the power to create completely custom orders.
            </p>
            <a
              href="#"
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block"
            >
              Start Ordering
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎲</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Mystery Tokens</h3>
              <p className="themed-text mb-4">
                Every order gives you a chance to receive a secret token. Our reward algorithm remains our closely guarded secret!
              </p>
              <div className="text-[#d1282e] font-bold text-lg">Random chance per order</div>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Custom Orders</h3>
              <p className="themed-text mb-4">
                Use tokens to unlock the ultimate dining experience - create completely custom dishes tailored to your taste.
              </p>
              <div className="text-[#d1282e] font-bold text-lg">1 token = 1 custom order</div>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Future Growth</h3>
              <p className="themed-text mb-4">
                As our service grows, we're planning even more exciting incentives and exclusive experiences for our token holders.
              </p>
              <div className="text-[#d1282e] font-bold text-lg">More coming soon!</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RewardsPage;
