import React from 'react';
import Header from '../shared/components/layout/Header';

function UnityPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Panda CommUnity Fund
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              Supporting communities through education, leadership development, and disaster relief.
            </p>
          </div> */}

          <div className="bg-gradient-to-r from-[#d1282e] to-red-600 text-white p-12 rounded-lg mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg max-w-4xl mx-auto">
              The Panda CommUnity Fund is dedicated to building stronger communities by investing in
              education, leadership development, and providing support during times of need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Education</h3>
              <p className="themed-text mb-4">
                Providing scholarships and educational resources to underserved communities.
              </p>
              <div className="text-[#d1282e] font-bold">$2M+ Awarded</div>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Leadership</h3>
              <p className="themed-text mb-4">
                Developing future leaders through mentorship and training programs.
              </p>
              <div className="text-[#d1282e] font-bold">500+ Leaders</div>
            </div>

            <div className="themed-card p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Relief</h3>
              <p className="themed-text mb-4">
                Rapid response support for communities affected by natural disasters.
              </p>
              <div className="text-[#d1282e] font-bold">50+ Communities</div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold themed-text-heavy text-center mb-8">Recent Impact</h2>
            <div className="space-y-6">
              <div className="themed-card p-6 flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#d1282e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2024
                </div>
                <div>
                  <h4 className="text-xl font-bold themed-text-heavy mb-2">Hurricane Relief Fund</h4>
                  <p className="themed-text">
                    Provided emergency funds and meals to families affected by natural disasters across the Southeast.
                  </p>
                </div>
              </div>

              <div className="themed-card p-6 flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#d1282e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2024
                </div>
                <div>
                  <h4 className="text-xl font-bold themed-text-heavy mb-2">AAPI Scholarship Program</h4>
                  <p className="themed-text">
                    Awarded $500,000 in scholarships to Asian American and Pacific Islander students pursuing higher education.
                  </p>
                </div>
              </div>

              <div className="themed-card p-6 flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#d1282e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2023
                </div>
                <div>
                  <h4 className="text-xl font-bold themed-text-heavy mb-2">Community Leadership Institute</h4>
                  <p className="themed-text">
                    Launched a program to develop community leaders with a focus on diversity and inclusion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold themed-text-heavy mb-6">Get Involved</h2>
            <p className="text-lg themed-text mb-8 max-w-3xl mx-auto">
              Learn more about how you can support the Panda CommUnity Fund or apply for assistance.
            </p>
            <div className="space-x-4">
              <a
                href="#"
                className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block"
              >
                Apply for Grant
              </a>
              <a
                href="#"
                className="bg-[#d1282e] text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-600 transition-colors inline-block"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UnityPage;
