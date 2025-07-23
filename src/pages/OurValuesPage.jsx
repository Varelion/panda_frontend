import React from 'react';
import Header from '../shared/components/layout/Header';

function OurValuesPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Our People
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              The principles that guide everything we do, from how we prepare food to how we serve our communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Respect</h3>
              <p className="themed-text">
                We treat every person with dignity, kindness, and understanding, creating an inclusive environment for all.
              </p>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Excellence</h3>
              <p className="themed-text">
                We strive for the highest quality in everything we do, from our food to our service to our relationships.
              </p>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Care</h3>
              <p className="themed-text">
                We genuinely care about our associates, guests, and communities, always putting people first.
              </p>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Continuous Learning</h3>
              <p className="themed-text">
                We believe in constant growth and improvement, embracing new ideas and learning from our experiences.
              </p>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Winning Together</h3>
              <p className="themed-text">
                Success comes through teamwork, collaboration, and supporting each other to achieve common goals.
              </p>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Integrity</h3>
              <p className="themed-text">
                We do the right thing, even when no one is watching, building trust through honest and ethical actions.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#d1282e] to-red-600 text-white p-12 rounded-lg mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Values in Action</h2>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Our values aren't just words on a wall – they're lived every day in every interaction,
                every decision, and every moment of service.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-2xl font-bold mb-2">2M+</div>
                  <div>Guests served daily</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-2">50,000+</div>
                  <div>Associates empowered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-2">2,300+</div>
                  <div>Locations worldwide</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold themed-text-heavy text-center mb-8">How We Live Our Values</h2>
            <div className="space-y-6">
              <div className="themed-card p-6">
                <h4 className="text-xl font-bold themed-text-heavy mb-3">In Our Kitchens</h4>
                <p className="themed-text">
                  Every dish is prepared with care and attention to detail, using fresh ingredients and time-honored recipes.
                </p>
              </div>

              <div className="themed-card p-6">
                <h4 className="text-xl font-bold themed-text-heavy mb-3">In Our Service</h4>
                <p className="themed-text">
                  We greet every guest with a smile and serve them with respect, making their experience memorable and enjoyable.
                </p>
              </div>
{/*
              <div className="themed-card p-6">
                <h4 className="text-xl font-bold themed-text-heavy mb-3">In Our Communities</h4>
                <p className="themed-text">
                  Through Panda Cares and the CommUnity Fund, we actively support education, disaster relief, and community development.
                </p>
              </div> */}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold themed-text-heavy mb-6">Join Our Mission</h2>
            <p className="text-lg themed-text mb-8 max-w-3xl mx-auto">
              Ready to be part of a team that lives these values every day? Explore opportunities to grow with us.
            </p>
            <a
              href="/signup"
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block"
            >
              Join Our Family
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OurValuesPage;
