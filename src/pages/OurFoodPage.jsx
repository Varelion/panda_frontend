import React from 'react';
import Header from '../shared/components/layout/Header';

function OurFoodPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Our Food
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              Authentic Chinese-American cuisine prepared fresh daily with the finest ingredients and traditional cooking methods.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="themed-card p-6 text-center">
              <div className="h-40 bg-[#d1282e] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl text-white">🥢</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Entrees</h3>
              <p className="themed-text mb-4">
                From our famous Orange Chicken to Beijing Beef, each entree is wok-cooked to perfection.
              </p>
              <div className="text-[#d1282e] font-bold">15+ Options Daily</div>
            </div>

            <div className="themed-card p-6 text-center">
              <div className="h-40 bg-[#d1282e] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl text-white">🍚</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Sides</h3>
              <p className="themed-text mb-4">
                Steamed white rice, fried rice, chow mein, and more - the perfect complement to any meal.
              </p>
              <div className="text-[#d1282e] font-bold">5+ Varieties</div>
            </div>

            <div className="themed-card p-6 text-center">
              <div className="h-40 bg-[#d1282e] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl text-white">🥟</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Appetizers</h3>
              <p className="themed-text mb-4">
                Crispy wontons, egg rolls, and potstickers made fresh throughout the day.
              </p>
              <div className="text-[#d1282e] font-bold">Fresh Daily</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#d1282e] to-red-600 text-white p-12 rounded-lg mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Signature Dishes</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🍊</div>
                  <h4 className="font-bold">Orange Chicken</h4>
                  <p className="text-sm opacity-90">Our #1 seller</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🥩</div>
                  <h4 className="font-bold">Beijing Beef</h4>
                  <p className="text-sm opacity-90">Sweet & tangy</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🐝</div>
                  <h4 className="font-bold">Honey Walnut Shrimp</h4>
                  <p className="text-sm opacity-90">Premium choice</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🍜</div>
                  <h4 className="font-bold">Chow Mein</h4>
                  <p className="text-sm opacity-90">Classic favorite</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold themed-text-heavy mb-6">Fresh Ingredients</h2>
              <p className="themed-text text-lg leading-relaxed mb-4">
                We source the freshest vegetables, premium cuts of meat, and authentic spices to create our signature dishes. 
                Our produce is delivered daily to ensure peak freshness and flavor.
              </p>
              <ul className="space-y-3">
                {[
                  'Vegetables delivered daily',
                  'Premium cuts of chicken, beef, and shrimp',
                  'Authentic Chinese spices and sauces',
                  'Made-from-scratch sauces',
                  'Wok-cooked to order in small batches'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm">✓</span>
                    </div>
                    <span className="themed-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold themed-text-heavy mb-6">Nutritional Options</h2>
              <p className="themed-text text-lg leading-relaxed mb-4">
                We offer a variety of healthier options to meet different dietary needs and preferences, 
                without compromising on taste or quality.
              </p>
              <div className="space-y-4">
                <div className="themed-card p-4">
                  <h4 className="font-bold themed-text-heavy mb-2">Wok Smart™</h4>
                  <p className="themed-text text-sm">Entrees with 300 calories or less per serving</p>
                </div>
                <div className="themed-card p-4">
                  <h4 className="font-bold themed-text-heavy mb-2">Super Greens</h4>
                  <p className="themed-text text-sm">Nutrient-rich mix of broccoli, cabbage, and kale</p>
                </div>
                <div className="themed-card p-4">
                  <h4 className="font-bold themed-text-heavy mb-2">Brown Rice</h4>
                  <p className="themed-text text-sm">Whole grain alternative to white rice</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold themed-text-heavy mb-6">Made Fresh Daily</h2>
            <p className="text-lg themed-text mb-8 max-w-4xl mx-auto">
              Every morning, our teams prepare fresh ingredients and cook dishes throughout the day to ensure 
              you always get the freshest, most flavorful meal possible.
            </p>
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold themed-text-heavy">6 AM</div>
                <div className="themed-text">Prep begins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold themed-text-heavy">8 AM</div>
                <div className="themed-text">First dishes ready</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold themed-text-heavy">All Day</div>
                <div className="themed-text">Fresh cooking</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold themed-text-heavy">10 PM</div>
                <div className="themed-text">Fresh until close</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="/?showMenu=true" 
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block mr-4"
            >
              Order Now
            </a>
            <a 
              href="/our-food-philosophy" 
              className="bg-[#d1282e] text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-600 transition-colors inline-block"
            >
              Our Philosophy
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OurFoodPage;