import React from 'react';
import Header from '../shared/components/layout/Header';

function OurShopPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Our Shop
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              From gift cards to exclusive merchandise, find the perfect way to share your love of Panda Express.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="themed-card p-8">
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">Gift Cards</h2>
              <p className="themed-text mb-6">
                Perfect for any occasion! Available in physical and digital formats with no expiration date.
              </p>
              <div className="bg-gradient-to-r from-[#d1282e] to-red-600 p-6 rounded-lg text-white mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🎁</div>
                  <div className="text-lg font-bold">Panda Express Gift Card</div>
                  <div className="text-sm opacity-90">Any amount $5 - $500</div>
                </div>
              </div>
              <a 
                href="/gift-cards" 
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors inline-block"
              >
                Buy Gift Cards
              </a>
            </div>

            <div className="themed-card p-8">
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">Swag Shop</h2>
              <p className="themed-text mb-6">
                Show your Panda pride with our exclusive collection of apparel, accessories, and collectibles.
              </p>
              <div className="bg-yellow-400 p-6 rounded-lg text-black mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🐼</div>
                  <div className="text-lg font-bold">Panda Merchandise</div>
                  <div className="text-sm">T-shirts, hoodies, and more</div>
                </div>
              </div>
              <a 
                href="https://shop.pandaexpress.com/" 
                className="bg-[#d1282e] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors inline-block"
              >
                Shop Merchandise
              </a>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold themed-text-heavy text-center mb-8">Featured Products</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="themed-card p-6 text-center">
                <div className="h-32 bg-[#d1282e] rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl text-white">👕</span>
                </div>
                <h3 className="font-bold themed-text-heavy mb-2">Panda T-Shirt</h3>
                <p className="themed-text text-sm mb-3">Classic logo tee in multiple colors</p>
                <div className="text-[#d1282e] font-bold">$19.99</div>
              </div>

              <div className="themed-card p-6 text-center">
                <div className="h-32 bg-[#d1282e] rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl text-white">🧢</span>
                </div>
                <h3 className="font-bold themed-text-heavy mb-2">Panda Cap</h3>
                <p className="themed-text text-sm mb-3">Adjustable baseball cap with embroidered logo</p>
                <div className="text-[#d1282e] font-bold">$24.99</div>
              </div>

              <div className="themed-card p-6 text-center">
                <div className="h-32 bg-[#d1282e] rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl text-white">☕</span>
                </div>
                <h3 className="font-bold themed-text-heavy mb-2">Panda Mug</h3>
                <p className="themed-text text-sm mb-3">Ceramic mug perfect for your morning coffee</p>
                <div className="text-[#d1282e] font-bold">$14.99</div>
              </div>

              <div className="themed-card p-6 text-center">
                <div className="h-32 bg-[#d1282e] rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl text-white">🧸</span>
                </div>
                <h3 className="font-bold themed-text-heavy mb-2">Panda Plushie</h3>
                <p className="themed-text text-sm mb-3">Adorable panda bear stuffed animal</p>
                <div className="text-[#d1282e] font-bold">$16.99</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#d1282e] to-red-600 text-white p-12 rounded-lg mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Why Shop With Us?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl mb-4">🚚</div>
                  <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
                  <p>On orders over $35 within the United States</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                  <p>High-quality materials and exclusive designs</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🔄</div>
                  <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
                  <p>30-day return policy for your peace of mind</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">Gift Ideas</h2>
              <p className="themed-text mb-6">
                Looking for the perfect gift for the Panda Express fan in your life? We've got you covered!
              </p>
              <ul className="space-y-3">
                {[
                  'Birthday and celebration gifts',
                  'Corporate gifts and employee appreciation',
                  'Back-to-school essentials',
                  'Holiday and seasonal items',
                  'Collector items and limited editions'
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
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">Corporate Orders</h2>
              <p className="themed-text mb-6">
                Need bulk orders for your business or event? We offer special pricing and custom options for larger quantities.
              </p>
              <div className="space-y-4">
                <div className="themed-card p-4">
                  <h4 className="font-bold themed-text-heavy mb-2">Bulk Discounts</h4>
                  <p className="themed-text text-sm">Special pricing for orders of 50+ items</p>
                </div>
                <div className="themed-card p-4">
                  <h4 className="font-bold themed-text-heavy mb-2">Custom Branding</h4>
                  <p className="themed-text text-sm">Add your company logo to select items</p>
                </div>
                <div className="themed-card p-4">
                  <h4 className="font-bold themed-text-heavy mb-2">Fast Turnaround</h4>
                  <p className="themed-text text-sm">Rush orders available for urgent needs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold themed-text-heavy mb-6">Start Shopping</h2>
            <p className="text-lg themed-text mb-8 max-w-3xl mx-auto">
              Whether you're treating yourself or finding the perfect gift, our shop has something for every Panda Express lover.
            </p>
            <div className="space-x-4">
              <a 
                href="/gift-cards" 
                className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block"
              >
                Buy Gift Cards
              </a>
              <a 
                href="https://shop.pandaexpress.com/" 
                className="bg-[#d1282e] text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-600 transition-colors inline-block"
              >
                Shop Merchandise
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OurShopPage;